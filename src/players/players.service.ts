import { Injectable, Logger } from '@nestjs/common';
import { CreatePlayerDTO } from './dtos/create-player.dto';
import { Player } from './interfaces/player.interface';

//Regra de negocio
@Injectable()
export class PlayersService {
  private players: Player[] = [];

  private readonly logger = new Logger(PlayersService.name);
  async createUpdatePlayer(createPlayerDTO: CreatePlayerDTO): Promise<void> {
    const { email } = createPlayerDTO;

    const findPlayer = this.players.find((el) => {
      return email === el.email;
    });
    if (findPlayer) {
      await this.updatePlayer(findPlayer, createPlayerDTO);
    } else {
      await this.create(createPlayerDTO);
    }
  }

  async getPlayers(): Promise<Player[]> {
    return await this.players;
  }

  async getPlayer(email: string): Promise<Player> {
    const player = this.players.find((el) => {
      el.name == email;
    });

    if (player != undefined) {
      return player;
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
}
