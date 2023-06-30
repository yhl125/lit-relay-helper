import { Module } from '@nestjs/common';
import { LitService } from './lit.service';
import { LitController } from './lit.controller';

@Module({
  controllers: [LitController],
  providers: [LitService],
})
export class LitModule {}
