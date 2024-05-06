import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Carbon } from './models/carbonCalculation.model';
import { Repository } from 'typeorm';
import { CarbonInput } from './models/carbonCalculationInput.model';

@Injectable()
export class CarbonService {
  private readonly logger = new Logger(CarbonService.name);

  // a constructor is a special method that is automatically called when a class is instantiated
  // constructor(
  //   @InjectRepository(Carbon)
  //   private readonly carbonRepository: Repository<Carbon>,
  // ) {}

  async findAll(): Promise<Partial<Carbon>[]> {
    const mockCarbon: Partial<Carbon> = {
      id: '1',
      sessionId: 'abc123',
      numPeopleLiving: 4,
      electricityConsumption: 500, // kWh per month
      electricityEmissions: 100, // kgCO2e per month
      creationDate: new Date('2024-05-06T12:00:00Z'),
    };
    try {
      this.logger.log('Finding all carbon calculatons');
      // return await this.carbonRepository.find();
      return [mockCarbon];
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
    const mockCarbon: Carbon = {
      id: '1',
      sessionId: 'abc123',
      commuteDistance: 0,
      commuteWeeklyFrequency: 0,
      commuteMode: '',
      commuteEmissions: 0,
      flightsPerYear: 0,
      averageFlightDurationHours: 0,
      airTravelEmissions: 0,
      numPeopleLiving: 4,
      electricityConsumption: 500, // kWh per month
      electricityEmissions: 100, // kgCO2e per month
      creationDate: new Date('2024-05-06T12:00:00Z'),
    };
    this.logger.log('Creating a new recipe');
    // const newCalcuation = this.carbonRepository.create({
    //   ...carbon,
    //   creationDate: new Date(),
    // });
    this.logger.log(`New carbon calcuation created`);
    // const savedCalcualtion = await this.carbonRepository.save(newCalcuation);
    // return savedCalcualtion;
    return mockCarbon;
  }
}
