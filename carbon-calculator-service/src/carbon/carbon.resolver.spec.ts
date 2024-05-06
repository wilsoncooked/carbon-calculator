import { Test, TestingModule } from '@nestjs/testing';
import { CarbonResolver } from './carbon.resolver';
import { CarbonService } from './carbon.service';
import { Carbon } from './models/carbonCalculation.model';

describe('CarbonResolver', () => {
  let resolver: CarbonResolver;
  let service: CarbonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CarbonResolver,
        {
          provide: CarbonService,
          useValue: {
            findAll: jest.fn(),
            createCarbonCalculation: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<CarbonResolver>(CarbonResolver);
    service = module.get<CarbonService>(CarbonService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('Carbon', () => {
    it('should return an array of Carbon objects', async () => {
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
      const findAllSpy = jest
        .spyOn(service, 'findAll')
        .mockResolvedValueOnce([mockCarbon]);
      const result = await resolver.Carbon();
      expect(findAllSpy).toHaveBeenCalled();
      expect(result).toEqual([mockCarbon]);
    });
  });

  describe('createCarbonCalcuation', () => {
    it('should create and return a Carbon object', async () => {
      const inputCarbon: Carbon = {
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
      const createCarbonCalculationSpy = jest
        .spyOn(service, 'createCarbonCalculation')
        .mockResolvedValueOnce(inputCarbon);
      const result = await resolver.createCarbonCalcuation(inputCarbon);
      expect(createCarbonCalculationSpy).toHaveBeenCalledWith(inputCarbon);
      expect(result).toEqual(inputCarbon);
    });
  });
});
