import { Module } from '@nestjs/common';
import { UserModule } from 'src/domain/nodes/user/user.module';
import { UploadFileModule } from 'src/upload-file/upload-file.module';
import { UserController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [UserModule, UploadFileModule],
  controllers: [UserController],
  providers: [UsersService],
})
export class UsersModule {}
