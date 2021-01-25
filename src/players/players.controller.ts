import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { CreatePlayerDTO } from './dtos/create-player.dto';
import { PlayersService } from './players.service';
import { Player } from './interfaces/player.interface';
import { query } from 'express';
import { Observable } from 'rxjs';

@Controller('/api/v1/players/')
export class PlayersController {
  //Injecao de dependencia
  constructor(private readonly playerservice: PlayersService) {}
  @Get()
  async getPlayers(@Query('email') email: string): Promise<Player | Player[]> {
    if (email) {
      return await this.playerservice.getPlayer(email)
    } else {
      return await this.playerservice.getAllPlayers();
    }
  }

  @Post()
  createPlayers(@Body() createPlayerDTO: CreatePlayerDTO) {
    const createdUpdatedPlayer = this.playerservice.createUpdatePlayerModel(
      createPlayerDTO,
    );
    return createdUpdatedPlayer;
  }

    @Delete()
    async deletePlayer(@Query('email') email: string): Promise<void> {
      await this.playerservice.deletePlayer(email);
    }
}
