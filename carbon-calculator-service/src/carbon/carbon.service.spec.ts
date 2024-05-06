import { Test, TestingModule } from '@nestjs/testing';
import { CarbonService } from './carbon.service';
import { CarbonInput } from './models/carbonCalculationInput.model';
import { Carbon } from './models/carbonCalculation.model';

describe('CarbonService', () => {
  let service: CarbonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CarbonService],
    }).compile();

    service = module.get<CarbonService>(CarbonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of Carbon objects', async () => {
      const result = await service.findAll();
      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0]).toHaveProperty('id');
      expect(result[0]).toHaveProperty('sessionId');
      expect(result[0]).toHaveProperty('numPeopleLiving');
      expect(result[0]).toHaveProperty('electricityConsumption');
      expect(result[0]).toHaveProperty('electricityEmissions');
      expect(result[0]).toHaveProperty('creationDate');
    });
  });

  describe('createCarbonCalculation', () => {
    it('should create a carbon calculation', async () => {
      const carbonInput: Carbon = {
        id: '1',
        creationDate: new Date('2024-05-06T12:00:00Z'),
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
      };
      const result = await service.createCarbonCalculation(carbonInput);
      expect(result).toBeDefined();
      expect(result).toHaveProperty('numPeopleLiving', 4);
      expect(result).toHaveProperty('electricityConsumption', 500);
      expect(result).toHaveProperty('electricityEmissions', 100);
    });
  });
});
