import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreatePlayerDTO } from './dtos/create-player.dto'

@Controller('/api/v1/players')
export class PlayersController {

    @Get()
    async getPlayers(){
        return JSON.stringify({
            resposta: "ok"
        })
    }

    @Post()
    async createUpdatePlayers(

        @Body() createPlayerDTO : CreatePlayerDTO

    ){



        return JSON.stringify({
            data:{
                name: createPlayerDTO.name
            }
        })
    }


}
