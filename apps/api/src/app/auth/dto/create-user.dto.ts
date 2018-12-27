import { IsAscii, IsOptional, MaxLength, MinLength } from 'class-validator';
import { ApiModelPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiModelPropertyOptional({ type: String, minLength: 4, maxLength: 12 })
  @IsOptional()
  @IsAscii()
  @MinLength(4)
  @MaxLength(12)
  readonly name: string;
}
