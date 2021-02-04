import { Model } from 'mongoose';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePlayerDTO } from './dtos/create-player.dto';
import { Player } from './interfaces/player.interface';
import { UpdatePlayerDTO } from './dtos/update-player.dto';


/********************************************************************************************/

//Regra de negocio
@Injectable()
export class PlayersService {
  constructor(
    @InjectModel('Player') private readonly PlayerModel: Model<Player>,
  ) {}

  //Creating a Player
  async createAPlayer(createPlayerDTO: CreatePlayerDTO): Promise<Player> {
    return await this.createPlayer(createPlayerDTO);
  }

  //Updating a Player
  async updateAPlayer(
    _id: string,
    updatePlayerDTO: UpdatePlayerDTO,
  ): Promise<Player> {
    return await this.updatePlayer(_id, updatePlayerDTO);
  }

  //Getting all Players
  async getAllPlayers(): Promise<Player[]> {
    return await this.findAll();
  }

  //Getting single Player by email
  async getPlayer(_id: string) {
    return await this.findSinglePlayer(_id);
  }

  // Deleting a Player
  async deletePlayer(email: string): Promise<void> {
    await this.deleteSinglePlayer(email);
  }

  /********************************************************************************************/

  private async findAll(): Promise<Player[]> {
    const players = await this.PlayerModel.find().exec();
    return players;
  }

  private async findSinglePlayer(_id: string): Promise<Player> {
    const foundPlayer = await this.PlayerModel.findById(_id);
    if (!foundPlayer) {
      throw new NotFoundException('Player with this _id not found!');
    } else {
      return foundPlayer;
    }
  }

  private async createPlayer(
    createPlayerDTO: CreatePlayerDTO,
  ): Promise<Player> {
    const emailToCheck = await this.PlayerModel.findOne({
      email: createPlayerDTO.email,
    });
    if (emailToCheck) {
      throw new BadRequestException('Not possible to create your account');
    }
    const createdPlayer = new this.PlayerModel(createPlayerDTO);
    return createdPlayer.save();
  }

  private async updatePlayer(
    _id: string,
    updatePlayerDTO: UpdatePlayerDTO,
  ): Promise<Player> {
    const foundPlayer = await this.PlayerModel.findById(_id);
    if (!foundPlayer) {
      throw new NotFoundException('Player with this _id not found!');
    }
    const updatedPlayer = await this.PlayerModel.findOneAndUpdate(
      { _id: _id },
      { name: updatePlayerDTO.name, phoneNumber: updatePlayerDTO.phoneNumber },
      { new: true },
    ).exec();
    return updatedPlayer;
  }

  private async deleteSinglePlayer(_id: string): Promise<void> {
    await this.PlayerModel.findOneAndRemove({ _id: _id });
  }
}

/********************************************************************************************/
