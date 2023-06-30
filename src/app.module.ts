import { Module } from '@nestjs/common';
import { LitModule } from './lit/lit.module';

@Module({
  imports: [LitModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
