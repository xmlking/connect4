import { CreateDateColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';

// TODO: Implement Soft Delete

export abstract class AuditBase {
  @ApiModelProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiModelProperty({
    type: 'string',
    format: 'date-time',
    example: '2018-11-21T06:20:32.232Z',
  })
  // @Exclude()
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt?: Date;

  @ApiModelProperty({
    type: 'string',
    format: 'date-time',
    example: '2018-11-21T06:20:32.232Z',
  })
  // @Exclude()
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt?: Date;

  @Exclude()
  @VersionColumn()
  version?: number;
}
