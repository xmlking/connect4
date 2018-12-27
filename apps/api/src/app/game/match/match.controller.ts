import { Body, Controller, Get, HttpStatus, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { CrudController } from '../../core';
import { Match } from './match.entity';
import { MatchService } from './match.service';
import { CreateMatchDto } from './dto/create-match.dto';
import { User, CurrentUser } from '../../auth';

@ApiBearerAuth()
@ApiUseTags('Match')
@Controller('match')
export class MatchController extends CrudController<Match> {
  constructor(private readonly matchService: MatchService) {
    super(matchService);
  }

  @ApiOperation({ title: 'Get opened matches' })
  @ApiResponse({ status: HttpStatus.OK, description: 'All opened matches', isArray: true })
  @Get('opened')
  async getOpenMatches(): Promise<[Match[], number]> {
    return this.matchService.getOpenMatches();
  }

  @ApiOperation({ title: 'Create new record' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'The record has been successfully created.', type: Match })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input, The response body may contain clues as to what went wrong',
  })
  @UseGuards(AuthGuard())
  @Post()
  async create(@Body() entity: CreateMatchDto, @CurrentUser() user: User): Promise<Match> {
    console.log(`${user.id} -- ${user.name}`);
    return this.matchService.createMatch(entity.settings, { id: user.id, name: user.name });
  }

  @ApiOperation({ title: 'Update an existing record' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'The record has been successfully edited.', type: Match })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Record not found' })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input, The response body may contain clues as to what went wrong',
  })
  @UseGuards(AuthGuard())
  @Put(':id')
  async update(@Param('id') id: string, entity: any, @CurrentUser() user: User): Promise<Match> {
    return this.matchService.joinMatch(id, { id: user.id, name: user.name });
  }
}
