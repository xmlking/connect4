import { IsAscii, IsNotEmpty, Length, MaxLength, MinLength } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiModelProperty({ type: String, minLength: 4, maxLength: 12 })
  @IsNotEmpty()
  @IsAscii()
  @Length(4, 12)
  readonly name: string;
}
