import { Module } from '@nestjs/common';
import { PlayersModule } from './players/players.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesModule } from './categories/categories.module';
import { PlayersService } from './players/players.service';
import { ChallengesModule } from './challenges/challenges.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://admin:rWN9pMFmjPBhdYJP@cluster0-shard-00-00.e6pt3.mongodb.net:27017,cluster0-shard-00-01.e6pt3.mongodb.net:27017,cluster0-shard-00-02.e6pt3.mongodb.net:27017/smartRanking?ssl=true&replicaSet=atlas-zmisih-shard-0&authSource=admin&retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      },
    ),
    PlayersModule,
    CategoriesModule,
    ChallengesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
