import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateChallengeDTO } from './dtos/create.challenge.dto';
import { Challenge } from './interfaces/challenge.interface';
import { PlayersService } from './../players/players.service';
import { CategoriesService } from './../categories/categories.service';
import { type } from 'os';
@Injectable()
export class ChallengesService {
  constructor(
    @InjectModel('Challenge') private readonly challengeModel: Model<Challenge>,
    private readonly playersService: PlayersService,
    private readonly categoriesService: CategoriesService,
  ) {}

  async createChallenge(
    createChallengeDTO: CreateChallengeDTO,
  ): Promise<Challenge> {
    return await this.creatingChallenge(createChallengeDTO);
  }

  /********************************************************************* */

  private async creatingChallenge(
    createChallengeDTO: CreateChallengeDTO,
  ): Promise<Challenge> {
    //checking if players are on database
    await this.playersService.getPlayer(
      createChallengeDTO.players[0].toString(),
    );
    await this.playersService.getPlayer(
      createChallengeDTO.players[1].toString(),
    );

    //checking if the requester is in the challenge
    if (
      createChallengeDTO.requester.toString() !==
        createChallengeDTO.players[0].toString() &&
      createChallengeDTO.requester.toString() !==
        createChallengeDTO.players[1].toString()
    ) {
      throw new BadRequestException(
        'the request player is not on the challenge',
      );
    }

    // //getting the requester category
    const categoryArray = await this.categoriesService.getCategories();

    const categoryFound: string[] = [];
    categoryArray.forEach((el1) => {
      el1.players.forEach((el) => {
        if (el['_id'] == createChallengeDTO.requester.toString()) {
          categoryFound.push(el1.category);
        }
      });
    });

    console.log(categoryFound[0]);

    const newChallenge = await new this.challengeModel(createChallengeDTO);
    return newChallenge.save();
  }
}
