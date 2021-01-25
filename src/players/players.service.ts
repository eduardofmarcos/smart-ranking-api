import { Model } from 'mongoose';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePlayerDTO } from './dtos/create-player.dto';
import { Player } from './interfaces/player.interface';

//Regra de negocio
@Injectable()
export class PlayersService {
  constructor(
    @InjectModel('Player') private readonly PlayerModel: Model<Player>,
  ) {}

  //Creating or Updating a Player
  async createUpdatePlayerModel(
    createPlayerDTO: CreatePlayerDTO,
  ): Promise<Player> {
    //findall
    const playerToCreateOrUpdate = await this.PlayerModel.findOne({
      email: createPlayerDTO.email,
    }).exec();

    if (playerToCreateOrUpdate) {
      return await this.updatePlayer(playerToCreateOrUpdate, createPlayerDTO);
    } else {
      return await this.createPlayer(createPlayerDTO);
    }
  }

  //Getting all Players
  async getAllPlayers(): Promise<Player[]> {
    return await this.findAll();
  }

  //Getting single Player by email
  async getPlayer(email: string) {
    return await this.findSinglePlayer(email);
  }

  // Deleting a Player
  async deletePlayer(email: string): Promise<void> {
    await this.deleteSinglePlayer(email);
  }

  // *****************************************************

  private async findAll(): Promise<Player[]> {
    const players = await this.PlayerModel.find().exec();
    return players;
  }

  private async findSinglePlayer(email: string): Promise<Player> {
    const foundPlayer = await this.PlayerModel.findOne({ email: email });
    if (!foundPlayer) {
      throw new NotFoundException('Player with this email not found!');
    } else {
      return foundPlayer;
    }
  }

  private async createPlayer(
    createPlayerDTO: CreatePlayerDTO,
  ): Promise<Player> {
    const createdPlayer = new this.PlayerModel(createPlayerDTO);
    return createdPlayer.save();
  }

  private async updatePlayer(
    player: Player,
    createPlayerDTO: CreatePlayerDTO,
  ): Promise<Player> {
    const updatedPlayer = await this.PlayerModel.findOneAndUpdate(
      { email: player.email },
      { $set: createPlayerDTO },
    ).exec();
    return updatedPlayer;
  }

  private async deleteSinglePlayer(email: string): Promise<void> {
    await this.PlayerModel.findOneAndRemove({ email: email });
  }
}
