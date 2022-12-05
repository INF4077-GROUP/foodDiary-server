import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @ApiProperty({ description: 'The name of the user.' })
  readonly name?: string;

  @IsEmail()
  @IsOptional()
  readonly email?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'Profile pic of the user.' })
  readonly avatar?: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ description: 'The date of birth of the user.' })
  readonly dateOfBirth?: number;

  @IsString()
  @IsOptional()
  @MaxLength(60)
  readonly description?: string;
}
