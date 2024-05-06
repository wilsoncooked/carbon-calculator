import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType('CarbonCalculation', { description: 'Carbon calcuation' })
@InputType('CreateCarbonCalculationInput', {
  description: 'Carbon calculation input',
})
export class Carbon {
  @Field(() => ID)
  id: string;

  @Field()
  sessionId: string;

  @Field()
  numPeopleLiving: number;

  @Field()
  electricityConsumption: number;

  @Field()
  electricityEmissions: number;

  @Field(() => Date)
  creationDate: Date;
}
