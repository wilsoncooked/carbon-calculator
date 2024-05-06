import { CarbonInput } from './carbonCalculationInput.model';

describe('CarbonInputInput', () => {
  let carbonInput: CarbonInput;

  beforeEach(() => {
    carbonInput = new CarbonInput();
    Object.assign(CarbonInput, {
      sessionId: 'abc123',
      commuteDistance: 10,
      commuteWeeklyFrequency: 5,
      commuteMode: 'car',
      commuteEmissions: 50,
      flightsPerYear: 20,
      averageFlightDurationHours: 2,
      airTravelEmissions: 200,
      numPeopleLiving: 4,
      electricityConsumption: 500,
      electricityEmissions: 100,
    });
  });

  it('should create an instance', () => {
    expect(CarbonInput).toBeDefined();
  });

  const fieldsToTest = [
    { name: 'sessionId', value: 'abc123' },
    { name: 'commuteDistance', value: 10 },
    { name: 'commuteWeeklyFrequency', value: 5 },
    { name: 'commuteMode', value: 'car' },
    { name: 'commuteEmissions', value: 50 },
    { name: 'flightsPerYear', value: 20 },
    { name: 'averageFlightDurationHours', value: 2 },
    { name: 'airTravelEmissions', value: 200 },
    { name: 'numPeopleLiving', value: 4 },
    { name: 'electricityConsumption', value: 500 },
    { name: 'electricityEmissions', value: 100 },
  ];

  fieldsToTest.forEach(({ name, value }) => {
    it(`should have a ${name}`, () => {
      expect(CarbonInput[name]).toEqual(value);
    });
  });
});
