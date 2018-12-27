import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Match } from './match/match.entity';
import { MatchController } from './match/match.controller';
import { MatchService } from './match/match.service';
import { SharedModule } from '../shared';

@Module({
  imports: [SharedModule, TypeOrmModule.forFeature([Match])],
  controllers: [MatchController],
  providers: [MatchService],
})
export class GameModule {}
