import { Controller, Delete, Get, Patch, Body } from '@nestjs/common';
import { ApiForbiddenResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/auth/decorators';
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

  @Delete('delete')
  @ApiOperation({ summary: 'Delete the user account' })
  async delete(@GetUser('id') id: string) {
    return this.usersService.delete(id);
  }
}
