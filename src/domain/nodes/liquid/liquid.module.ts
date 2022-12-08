import { Module } from '@nestjs/common';
import { LiquidRepository } from './liquid.service';

@Module({
  providers: [LiquidRepository],
  exports: [LiquidRepository],
})
export class LiquidModule {}
