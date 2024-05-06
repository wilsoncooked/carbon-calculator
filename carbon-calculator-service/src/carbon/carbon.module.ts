import { Module } from '@nestjs/common';
import { CarbonService } from './carbon.service';
import { CarbonResolver } from './carbon.resolver';

@Module({
  imports: [],
  providers: [CarbonService, CarbonResolver],
})
export class CarbonModule {}
