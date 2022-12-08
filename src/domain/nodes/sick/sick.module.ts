import { Module } from '@nestjs/common';
import { SickRepository } from './sick.service';

@Module({
  providers: [SickRepository],
  exports: [SickRepository],
})
export class SickModule {}
