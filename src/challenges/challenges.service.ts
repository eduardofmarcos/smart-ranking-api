import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateChallengeDTO } from './dtos/create.challenge.dto';
import { Challenge } from './interfaces/challenge.interface';
@Injectable()
export class ChallengesService {
  constructor(
    @InjectModel('Challenge') private readonly challengeModel: Model<Challenge>,
  ) {}

  async createChallenge(
    createChallengeDTO: CreateChallengeDTO,
  ): Promise<Challenge> {
    return await this.creatingChallenge(createChallengeDTO);
  }

  /********************************************************************* */

  async creatingChallenge(
    createChallengeDTO: CreateChallengeDTO,
  ): Promise<Challenge> {
    const newChallenge = await new this.challengeModel(createChallengeDTO);
    return newChallenge.save();
  }
}
