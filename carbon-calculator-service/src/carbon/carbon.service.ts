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

  async createCarbonCalculation(
    carbonInput: CarbonInput,
  ): Promise<CarbonInput> {
    this.logger.log('Creating a new recipe');
    const newCalcuation = this.carbonRepository.create({
      ...carbonInput,
      electricityEmissions: carbonInput.electricityConsumption * 0.5,
      commuteEmissions: carbonInput.commuteDistance * 0.5,
      airTravelEmissions: carbonInput.flightsPerYear * 0.5,
      creationDate: new Date(),
    });
    this.logger.log(`New carbon calcuation created`);
    const savedCalcualtion = await this.carbonRepository.save(newCalcuation);
    return savedCalcualtion;
  }
}
