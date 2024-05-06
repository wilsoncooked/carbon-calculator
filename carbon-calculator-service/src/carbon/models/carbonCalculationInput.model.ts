import { Field, InputType } from '@nestjs/graphql';

@InputType('CreateCarbonCalculationInput', {
  description: 'Carbon calculation input',
})
export class CarbonInput {
  @Field()
  sessionId: string;

  @Field()
  commuteDistance: number;

  @Field()
  commuteWeeklyFrequency: number;

  @Field()
  commuteMode: string;

  @Field()
  flightsPerYear: number;

  @Field()
  averageFlightDurationHours: number;

  @Field()
  numPeopleLiving: number;

  @Field()
  electricityConsumption: number;
}
