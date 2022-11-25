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

  @IsNumber()
  @IsOptional()
  readonly dateOfBirth?: number;

  @IsString()
  @IsOptional()
  @MaxLength(60)
  readonly description?: string;
}
