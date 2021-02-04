import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ChallengesService } from './challenges.service';
import { CreateChallengeDTO } from './dtos/create.challenge.dto';
import { UpdateChallengeDTO } from './dtos/update.challenge.dto';
import { Challenge } from './interfaces/challenge.interface';
import { AssignMatchToAChallengeDTO} from './matches/dtos/create-match.dto'

@Controller('/api/v1/challenges')
export class ChallengesController {
  constructor(private readonly challengeService: ChallengesService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createChallenge(
    @Body() createChallengeDTO: CreateChallengeDTO,
  ): Promise<Challenge> {
    return await this.challengeService.createChallenge(createChallengeDTO);
  }


  @Get()
  async getChallenges(): Promise<Challenge[]> {
    return await this.challengeService.getChallenges();
  }

  @Get('/:playerId')
  async getChallengesByPlayer(
    @Param('playerId') playerId: string,
  ): Promise<Challenge[]> {
    return await this.challengeService.getChallengesByPlayer(playerId);
  }

  @Put('/:_id')
  async updateAChallenge(@Param('_id') _id:string, @Body() updateChallengeDTO: UpdateChallengeDTO): Promise<void>{
    await this.challengeService.updateAChallenge(_id, updateChallengeDTO)
  }

  @Put('matchs/:_id')
  async updateAMatch(@Param('_id') _id:string,
    @Body() assignMatchToAChallengeChallengeDTO: AssignMatchToAChallengeDTO,
  ): Promise<void> {
    await this.challengeService.updateAMatch(_id, assignMatchToAChallengeChallengeDTO);
  }


  @Delete('/:_id')
  async deleteAChallenge(@Param('_id') _id:string):Promise<void>{
    await this.challengeService.deleteAChallenge(_id)
  }
}
