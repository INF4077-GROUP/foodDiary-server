import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Public } from './decorators';
import { AuthDto } from './dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
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
  async logout() {
    //
  }
}
