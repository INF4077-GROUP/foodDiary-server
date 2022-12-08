import { Module } from '@nestjs/common';
import { BowelRepository } from './bowel.service';

@Module({
  providers: [BowelRepository],
  exports: [BowelRepository],
})
export class BowelModule {}
