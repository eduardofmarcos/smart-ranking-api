import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreatePlayerDTO } from './dtos/create-player.dto';
import { PlayersService } from './players.service';
import { Player } from './interfaces/player.interface';
import { PlayerValidationParameterPipe } from './pipes/player-validation-parameter.pipe';
import { UpdatePlayerDTO } from './dtos/update-player.dto';

/********************************************************************************************/

@Controller('/api/v1/players/')
export class PlayersController {
  //Injecao de dependencia
  constructor(private readonly playerservice: PlayersService) {}

  @Get()
  async getPlayers(): Promise<Player[]> {
    return await this.playerservice.getAllPlayers();
  }

  @Get('/:_id')
  async getPlayer(
    @Param('_id', PlayerValidationParameterPipe) _id: string,
  ): Promise<Player> {
    return await this.playerservice.getPlayer(_id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createPlayer(@Body() createPlayerDTO: CreatePlayerDTO) {
    const createdPlayer = this.playerservice.createAPlayer(createPlayerDTO);
    return createdPlayer;
  }

  @Put('/:_id')
  @UsePipes(ValidationPipe)
  async updateAPlayer(
    @Param('_id', PlayerValidationParameterPipe) _id: string,
    @Body() updatePlayerDTO: UpdatePlayerDTO,
  ): Promise<Player> {
    const updatedPlayer = await this.playerservice.updateAPlayer(
      _id,
      updatePlayerDTO,
    );
    return updatedPlayer;
  }

  @Delete('/:_id')
  async deletePlayer(
    @Param('_id', PlayerValidationParameterPipe) _id: string,
  ): Promise<void> {
    await this.playerservice.deletePlayer(_id);
  }
}

/********************************************************************************************/
