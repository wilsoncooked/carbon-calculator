import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Carbon } from './models/carbonCalculation.model';
import { CarbonService } from './carbon.service';
import { CarbonInput } from './models/carbonCalculationInput.model';

@Resolver((of) => Carbon)
export class CarbonResolver {
  constructor(private carbonService: CarbonService) {}

  @Query((returns) => [Carbon])
  async getCarbon() {
    return this.carbonService.findAll();
  }

  @Query((returns) => [Carbon])
  async getCarbonBySessionId(@Args('sessionId') sessionId: string) {
    return this.carbonService.findBySessionId(sessionId);
  }

  @Mutation((returns) => Carbon)
  async createCarbonCalcuation(@Args('input') carbonInput: CarbonInput) {
    return this.carbonService.createCarbonCalculation(carbonInput);
  }
}
