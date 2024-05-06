import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Carbon } from './models/carbonCalculation.model';
import { Repository } from 'typeorm';
import { CarbonInput } from './models/carbonCalculationInput.model';

@Injectable()
export class CarbonService {
  private readonly logger = new Logger(CarbonService.name);

  constructor(
    @InjectRepository(Carbon)
    private readonly carbonRepository: Repository<Carbon>,
  ) {}

  async findAll(): Promise<Partial<Carbon>[]> {
    try {
      this.logger.log('Finding all carbon calculatons');
      return await this.carbonRepository.find();
    } catch (error) {
      this.logger.error(
        `Error occurred while finding carbon calculatons: ${error.message}`,
      );
      throw new Error('Error occurred while finding carbon calculatons');
    }
  }

  async findBySessionId(sessionId: string): Promise<Partial<Carbon>[]> {
    try {
      this.logger.log(
        `Finding carbon calculations by session id: ${sessionId}`,
      );
      const results = await this.carbonRepository.findOne({
        where: { sessionId },
      });
      if (!results) {
        this.logger.error(`Session with id: ${sessionId} not found`);
        throw new Error('Session not found');
      }
      return [results];
    } catch (error) {
      this.logger.error(
        `Error occurred while finding carbon calculations by session id: ${error.message}`,
      );
      throw new Error(
        'Error occurred while finding carbon calculations by session id',
      );
    }
  }

  async createCarbonCalculation(
    carbonInput: CarbonInput,
  ): Promise<CarbonInput> {
    this.logger.log('Creating a new recipe');
    const newCalcuation = this.carbonRepository.create({
      ...carbonInput,
      electricityEmissions: carbonInput.electricityConsumption * 0.5,
      commuteEmissions: carbonInput.commuteDistance * 0.5,
      airTravelEmissions:
        carbonInput.averageFlightDurationHours *
        800 *
        carbonInput.flightsPerYear,
      creationDate: new Date(),
    });
    this.logger.log(`New carbon calcuation created`);
    const savedCalcualtion = await this.carbonRepository.save(newCalcuation);
    return savedCalcualtion;
  }
}
