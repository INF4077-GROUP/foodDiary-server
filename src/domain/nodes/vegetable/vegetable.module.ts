import { Module } from '@nestjs/common';
import { VegetableRepository } from './vegetable.service';

@Module({
  providers: [VegetableRepository],
  exports: [VegetableRepository],
})
export class VegetableModule {}
