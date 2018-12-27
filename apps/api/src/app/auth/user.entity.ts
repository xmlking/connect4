import { Column, CreateDateColumn, Entity, UpdateDateColumn, VersionColumn } from 'typeorm';
import { ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Base } from '../core/entities/base.entity';
import { Exclude } from 'class-transformer';

@Entity('user')
export class User extends Base {
  @ApiModelPropertyOptional({ type: String })
  @IsString()
  @Column({ nullable: true })
  name?: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @Exclude()
  @VersionColumn()
  version?: number;
}
