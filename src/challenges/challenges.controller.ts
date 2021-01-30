import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { ChallengesService } from './challenges.service';
import { CreateChallengeDTO } from './dtos/create.challenge.dto';
import { Challenge } from './interfaces/challenge.interface';

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
}
