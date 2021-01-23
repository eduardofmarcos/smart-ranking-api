import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreatePlayerDTO } from './dtos/create-player.dto';
import { PlayersService } from './players.service';
import { Player } from './interfaces/player.interface';

@Controller('/api/v1/players')
export class PlayersController {
  //Injecao de dependencia
  constructor(private readonly playerservice: PlayersService) {}
  @Get()
  async getPlayers(): Promise<Player[]> {
    return this.playerservice.getPlayers();
  }

//   @Get('/email')
//   async getAllPlayer(@Param email): Promise<Player> {
//     return this.playerservice.getPlayer(email);
//   }

  @Post()
  async createUpdatePlayers(@Body() createPlayerDTO: CreatePlayerDTO) {
    await this.playerservice.createUpdatePlayer(createPlayerDTO);
  }
}
