import { Global, Module } from '@nestjs/common';
import { CommonRepository } from './common.service';

@Global()
@Module({
  providers: [CommonRepository],
  exports: [CommonRepository],
})
export class CommonRepoModule {}
