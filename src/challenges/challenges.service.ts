import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateChallengeDTO } from './dtos/create.challenge.dto';
import { Challenge } from './interfaces/challenge.interface';
import { PlayersService } from './../players/players.service';
import { CategoriesService } from './../categories/categories.service';
import { Category } from './../categories/interfaces/category.interface';
import { ChallengeStatus } from './challenge-status.enum';
import { UpdateChallengeDTO } from './dtos/update.challenge.dto';

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

  async getChallenges(): Promise<Challenge[]> {
    return await this.gettingChallenges();
  }

  async getChallengesByPlayer(playerId: string): Promise<Challenge[]> {
    return await this.gettingChallengesByPlayer(playerId);
  }

  async updateAChallenge(
    _id: string,
    updateChallengeDTO: UpdateChallengeDTO,
  ): Promise<void> {
    await this.updatingAChallenge(_id, updateChallengeDTO);
  }

  async deleteAChallenge(_id:string):Promise<void>{
    await this.deletingAChallenge(_id)
  }

  /********************************************************************************************/

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

    //getting the requester category

    const categoryToReturn = await this.findingCategory(
      await this.categoriesService.getCategories(),
      createChallengeDTO,
    );

    //persisting on DB
    const { dateTimeChallenge, requester, players } = createChallengeDTO;
    const newObjectToSaveOnDB = {
      dateTimeChallenge,
      requester,
      players,
      status: ChallengeStatus.PENDING,
      dateTimeRequest: new Date().toISOString(),
      category: categoryToReturn,
    };
    const newChallenge = await new this.challengeModel(newObjectToSaveOnDB);
    return newChallenge.save();
  }

  private async gettingChallenges(): Promise<Challenge[]> {
    return this.challengeModel.find();
  }

  private async gettingChallengesByPlayer(
    playerId: string,
  ): Promise<Challenge[]> {
    const foundPlayer = await this.playersService.getPlayer(playerId);
    return await this.challengeModel
      .find()
      .where('players')
      .in(foundPlayer._id);
  }

  //updating a challenge
  private async updatingAChallenge(
    _id: string,
    updateChallengeDTO: UpdateChallengeDTO,
  ): Promise<void> {
    
    const possibleStatus = [ChallengeStatus.ACCEPTED, ChallengeStatus.DENIED, ChallengeStatus.CANCELLED]
    if (updateChallengeDTO.status && !possibleStatus.includes(updateChallengeDTO.status)){
      throw new BadRequestException('for status: only accepted values: [ACCEPTED, DENIED, CANCELLED]')
    }

    const isChallengeRegistred = await this.getAChallenge(_id)
    if(!isChallengeRegistred){
      throw new BadRequestException("this challenged is not on our database")
    }

    await this.challengeModel.findOneAndUpdate(
      { _id: _id },
      { $set: updateChallengeDTO },
    );
  }

  //delete a challenge
  private async deletingAChallenge(_id:string):Promise<void>{
    await this.challengeModel.findByIdAndUpdate({_id:_id},{status:ChallengeStatus.CANCELLED})
  }

  /*********************************** Aux Methods ********************************************/

  private async findingCategory(
    categoryArray: Category[],
    createChallengeDTO: CreateChallengeDTO,
  ): Promise<String> {
    const categoryFound: string[] = [];
    categoryArray.forEach((categoryElement) => {
      categoryElement.players.forEach((playerElement) => {
        if (playerElement['_id'] == createChallengeDTO.requester.toString()) {
          categoryFound.push(categoryElement.category);
        }
      });
    });
    return categoryFound[0];
  }

  private async getAChallenge(_id:string): Promise<Challenge>{
    return await this.challengeModel.findOne({_id:_id})
  }

}
