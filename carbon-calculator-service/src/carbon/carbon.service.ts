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
        order: { creationDate: 'DESC' },
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

    const commuteModes = {
      CAR: { name: 'Car', emissionPerKm: 0.2 },
      BUS: { name: 'Bus', emissionPerKm: 0.05 },
      TRAIN: { name: 'Train', emissionPerKm: 0.03 },
      BIKE: { name: 'Bike', emissionPerKm: 0 },
      WALK: { name: 'Walk', emissionPerKm: 0 },
    };

    const calculateYearlyCommuteEmissions = (
      mode: string,
      dailyDistanceInKm: number,
      weeklyFrequency: number,
    ): number => {
      const commuteMode = commuteModes[mode];
      if (!commuteMode) {
        throw new Error(`Invalid commute mode: ${mode}`);
      }

      const emissionPerKm = commuteMode.emissionPerKm;
      const weeklyDistance = dailyDistanceInKm * 7;
      const yearlyDistance = weeklyDistance * weeklyFrequency * 52;
      return emissionPerKm * yearlyDistance;
    };

    const newCalcuation = this.carbonRepository.create({
      ...carbonInput,
      electricityEmissions: carbonInput.electricityConsumption * 12 * 0.5,
      commuteEmissions: calculateYearlyCommuteEmissions(
        carbonInput.commuteMode,
        carbonInput.commuteDistance,
        carbonInput.commuteWeeklyFrequency,
      ),
      airTravelEmissions:
        carbonInput.averageFlightDurationHours *
        carbonInput.flightsPerYear *
        2.24,
      creationDate: new Date(),
    });
    this.logger.log(`New carbon calcuation created`);
    const savedCalcualtion = await this.carbonRepository.save(newCalcuation);
    return savedCalcualtion;
  }
}
