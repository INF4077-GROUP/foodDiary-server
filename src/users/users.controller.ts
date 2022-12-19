import {
  Controller,
  Delete,
  Get,
  Patch,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiForbiddenResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import * as multer from 'multer';
import { GetUser } from 'src/auth/decorators';
import { FileExtensionValidation } from 'src/upload-file/pipes/file-extention-validation.pipe';
import { FileSizeValidation } from 'src/upload-file/pipes/file-size-validation.pipe';
import { IMAGE } from 'src/upload-file/upload-file.constants';
import { UploadOperations } from 'src/upload-file/utils';
import { UpdateUserDto } from './dto';
import { UserEntity } from './entities';
import { UserInterface } from './interfaces';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('Users')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  async getMe(@GetUser() currentUser: UserInterface) {
    return new UserEntity(currentUser);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiForbiddenResponse({ description: 'Forbiden.' })
  async findAll() {
    return await this.usersService.findAll();
  }

  @Patch('update')
  @ApiOperation({ summary: 'Update user' })
  @ApiForbiddenResponse({ description: 'Forbiden.' })
  async update(
    @GetUser('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Patch('update/avatar')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: multer.diskStorage({
        destination: 'uploads',
        filename: UploadOperations.getFilename,
      }),
    }),
  )
  async updateAvatar(
    @UploadedFile(FileExtensionValidation, new FileSizeValidation(IMAGE))
    file: Express.Multer.File,
    @GetUser('id') id: string,
  ) {
    return this.usersService.updateAvatar(id, file);
  }

  @Delete('delete')
  @ApiOperation({ summary: 'Delete the user account' })
  async delete(@GetUser('id') id: string) {
    return this.usersService.delete(id);
  }
}
