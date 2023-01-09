import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { GetUser, Public } from './decorators';
import { AuthDto } from './dto';
import { JwtRefreshGuard } from './guards';
import { Tokens } from './types';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a user account.' })
  async register(@Body() authDto: AuthDto) {
    return this.authService.register(authDto);
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login a user.' })
  async login(@Body() authDto: AuthDto) {
    return this.authService.login(authDto);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Logout the user.' })
  async logout(@GetUser('id') userId: string) {
    return this.authService.logout(userId);
  }

  @Public()
  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Refresh the token of the user.' })
  async refresh(@GetUser() user: any): Promise<Tokens> {
    const { id, bearerRtToken } = user;
    return this.authService.refreshTokens(id, bearerRtToken);
  }
}
