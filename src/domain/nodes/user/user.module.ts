import { Module } from '@nestjs/common';
import { UserRepository } from './user.service';

@Module({
  providers: [UserRepository],
  exports: [UserRepository],
})
export class UserModule {}
