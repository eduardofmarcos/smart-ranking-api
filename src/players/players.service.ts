import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { exception } from 'console';
import { CreatePlayerDTO } from './dtos/create-player.dto';
import { Player } from './interfaces/player.interface';

//Regra de negocio
@Injectable()
export class PlayersService {
  private players: Player[] = [];

  private readonly logger = new Logger(PlayersService.name);
  createUpdatePlayer(createPlayerDTO: CreatePlayerDTO): void {
    const { email } = createPlayerDTO;

    const findPlayer = this.players.find((el) => {
      return email === el.email;
    });
    if (findPlayer) {
      this.updatePlayer(findPlayer, createPlayerDTO);
    } else {
      this.create(createPlayerDTO);
    }
  }

  getPlayers(): Player[] {
    return this.players;
  }

  getPlayer(email: string): Player {
    const player = this.players.find((el) => {
      return el.email === email;
    });

    if (!player) {
      throw new NotFoundException(`Player with email: ${email} not found!`);
    }

    return player;
  }

  deletePlayer(email: string): void {
    const indexOfPlayerToDelete = this.players.findIndex(
      (el) => el.email === email,
    );
    console.log(indexOfPlayerToDelete);
    if (indexOfPlayerToDelete !== -1) {
      this.delete(indexOfPlayerToDelete);
    } else {
      throw new NotFoundException(`Player with email: ${email} not found!`);
    }
  }

  //desacoplado
  private create(createPlayerDTO: CreatePlayerDTO): void {
    const { name, email, phoneNumber } = createPlayerDTO;

    const player: Player = {
      _id: '1234234',
      phoneNumber,
      name,
      email,
      ranking: 'A',
      rankingPosition: 1,
      urlPhoto: 'www.pic.com',
    };
    // this.logger.log(`Player: ${JSON.stringify(player)}`);
    this.players.push(player);
  }

  private updatePlayer(player: Player, createPlayerDTO: CreatePlayerDTO): void {
    player.name = createPlayerDTO.name;
  }

  private delete(index: number): void {
    this.players.splice(index, 1);
  }
}
