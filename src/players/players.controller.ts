import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { CreatePlayerDTO } from './dtos/create-player.dto';
import { PlayersService } from './players.service';
import { Player } from './interfaces/player.interface';
import { query } from 'express';

@Controller('/api/v1/players/')
export class PlayersController {
  //Injecao de dependencia
  constructor(private readonly playerservice: PlayersService) {}
  @Get()
  getPlayers(@Query('email') email: string): Player[] | Player {
    if (email) {
      return this.playerservice.getPlayer(email);
    } else {
      return this.playerservice.getPlayers();
    }
  }

  @Post()
  createUpdatePlayers(@Body() createPlayerDTO: CreatePlayerDTO) {
    this.playerservice.createUpdatePlayer(createPlayerDTO);
  }


  @Delete()
  deletePlayer(@Query('email') email: string): void {
    this.playerservice.deletePlayer(email);
  }
}
