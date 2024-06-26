import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('CarbonCalculation', { description: 'Carbon calcuation' })
export class Carbon {
  @Field(() => ID)
  id: string;

  @Field()
  sessionId: string;

  @Field()
  commuteDistance: number;

  @Field()
  commuteWeeklyFrequency: number;

  @Field()
  commuteMode: string;

  @Field()
  commuteEmissions: number;

  @Field()
  flightsPerYear: number;

  @Field()
  averageFlightDurationHours: number;

  @Field()
  airTravelEmissions: number;

  @Field()
  numPeopleLiving: number;

  @Field()
  electricityConsumption: number;

  @Field()
  electricityEmissions: number;

  @Field(() => Date)
  creationDate: Date;
}
