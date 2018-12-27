import { IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { MatchSettings } from './match-settings.model';

export class CreateMatchDto {
  @ApiModelProperty({ type: MatchSettings })
  @IsNotEmpty()
  settings: MatchSettings;
}
