import { Module } from '@nestjs/common';
import { CarbonService } from './carbon.service';
import { CarbonResolver } from './carbon.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Carbon } from './carbon.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Carbon])],
  providers: [CarbonService, CarbonResolver],
})
export class CarbonModule {}
