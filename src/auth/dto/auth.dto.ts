import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length, MinLength } from 'class-validator';

export class AuthDto {
  @IsString()
  @IsNotEmpty()
  @Length(4, 15, {
    message: 'The lenght of your name must be between 4 and 15',
  })
  @ApiProperty({ description: 'Name of the user' })
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty({ description: 'Password of the user' })
  readonly password: string;
}
