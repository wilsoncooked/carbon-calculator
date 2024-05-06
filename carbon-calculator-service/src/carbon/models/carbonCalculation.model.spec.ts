import { Carbon } from './carbonCalculation.model';

describe('Carbon', () => {
  let carbon: Carbon;

  beforeEach(() => {
    carbon = new Carbon();
    Object.assign(carbon, {
      id: '1',
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
      creationDate: new Date('2024-05-06T12:00:00Z'),
    });
  });

  it('should create an instance', () => {
    expect(carbon).toBeDefined();
  });

  const fieldsToTest = [
    { name: 'id', value: '1' },
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
    { name: 'creationDate', value: new Date('2024-05-06T12:00:00Z') },
  ];

  fieldsToTest.forEach(({ name, value }) => {
    it(`should have a ${name}`, () => {
      expect(carbon[name]).toEqual(value);
    });
  });
});
