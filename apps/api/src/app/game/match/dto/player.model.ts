import { IsEnum, IsNotEmpty, IsNumber, IsString, IsUUID, Length, MaxLength, MinLength } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { Player as iPlayer, PlayerRole, PlayerValue } from '@xmlking/models';

export class Player implements iPlayer {
  @ApiModelProperty({ type: String })
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @ApiModelProperty({ type: String, minLength: 4, maxLength: 12})
  @IsNotEmpty()
  @IsString()
  @Length(4, 12)
  name: string;

  @ApiModelProperty({ type: Number, enum: [1, -1] })
  // @ApiModelProperty({ type: Number, enum: PlayerValue })
  @IsNotEmpty()
  @IsEnum(PlayerValue)
  value: PlayerValue;

  @ApiModelProperty({type: Number, enum: [1, 2] })
  // @ApiModelProperty({type: Number, enum: PlayerRole })
  @IsNotEmpty()
  @IsEnum(PlayerRole)
  role: PlayerRole;
}
