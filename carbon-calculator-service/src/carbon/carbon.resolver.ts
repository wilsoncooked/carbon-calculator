import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Carbon } from './models/carbonCalculation.model';
import { CarbonService } from './carbon.service';

@Resolver((of) => Carbon)
export class CarbonResolver {
  constructor(private carbonService: CarbonService) {}

  @Query((returns) => [Carbon])
  async Carbon() {
    return this.carbonService.findAll();
  }

  @Mutation((returns) => Carbon)
  async createCarbonCalcuation(@Args('Carbon') carbon: Carbon) {
    return this.carbonService.createCarbonCalcuation(carbon);
  }
}
