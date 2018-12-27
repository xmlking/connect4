import { Board, Match as iMatch, MatchStatus, PlayerRole } from '@xmlking/models';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { Base } from '../../core/entities/base.entity';
import { Column, CreateDateColumn, Entity, UpdateDateColumn, VersionColumn } from 'typeorm';
import { ArrayMaxSize, ArrayMinSize, ArrayNotEmpty, IsArray, IsEnum, IsJSON, IsNotEmpty } from 'class-validator';
import { Exclude } from 'class-transformer';
import { MatchSettings } from './dto/match-settings.model';
import { Player } from './dto/player.model';

@Entity('match')
export class Match extends Base implements iMatch {
  @ApiModelProperty({ type: Number, isArray: true })
  // @Column('jsonb')
  // @Column('simple-array')
  @Column('smallint', { nullable: true, array: true })
  @IsArray()
  board: Board;

  @ApiModelProperty({ type: [Player], maxItems: 1, minItems: 2})
  @Column('jsonb'/*, { array: true }*/)
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @ArrayMaxSize(2)
  players: Player[];

  @ApiModelProperty({ type: MatchSettings })
  @Column('jsonb')
  settings: MatchSettings;

  @ApiModelProperty({ type: Number, enum: MatchStatus, default: MatchStatus.Initialized })
  @Column( { type: 'enum', enum: MatchStatus, default: `${MatchStatus.Initialized}` })
  @IsNotEmpty()
  @IsEnum(MatchStatus)
  status: MatchStatus;

  @ApiModelPropertyOptional({ type: Player })
  @Column('jsonb', { nullable: true })
  winnerPlayer?: Player;

  @ApiModelPropertyOptional({ type: 'string', format: 'date-time', example: '2018-11-21T06:20:32.232Z' })
  @CreateDateColumn()
  createdAt?: Date;

  @ApiModelPropertyOptional({ type: 'string', format: 'date-time', example: '2018-11-21T06:20:32.232Z' })
  @UpdateDateColumn()
  updatedAt?: Date;

  @Exclude()
  @VersionColumn()
  version?: number;
}
