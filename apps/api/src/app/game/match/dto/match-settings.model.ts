import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, Max, Min } from 'class-validator';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { MatchSettings as iMatchSettings } from '@xmlking/models';

export class MatchSettings implements iMatchSettings {
  @ApiModelProperty({ type: Number, minimum: 6, maximum: 12, default: 6})
  @IsNotEmpty()
  @IsNumber()
  @Min(6)
  @Max(12)
  numRows: number;

  @ApiModelProperty({ type: Number, minimum: 7, maximum: 14, default: 7})
  @IsNotEmpty()
  @IsNumber()
  @Min(7)
  @Max(14)
  numCols: number;

  @ApiModelProperty({ type: Number, minimum: 4, maximum: 6, default: 4})
  @IsNotEmpty()
  @IsNumber()
  @Min(4)
  @Max(6)
  four: number;

  @ApiModelPropertyOptional({type: Boolean, default: true})
  @IsOptional()
  @IsBoolean()
  ghostHelper?: boolean;
}
