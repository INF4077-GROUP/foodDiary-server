import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiForbiddenResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards';
import { CreateUserDto } from './dto';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('Users')
@UseGuards(JwtGuard)
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiForbiddenResponse({ description: 'Forbiden.' })
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user' })
  findOneById(@Param('id') id: string) {
    return this.usersService.findOneById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a user' })
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user' })
  async delete(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}
