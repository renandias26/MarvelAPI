import { Module } from '@nestjs/common/decorators/modules/module.decorator';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ComicsModule } from './comics/comics.module';
import { CharactersModule } from './characters/characters.module';
import { CreatorsModule } from './creators/creators.module';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ComicsModule,
    CharactersModule,
    CreatorsModule,
    MongooseModule.forRoot('mongodb://0.0.0.0/marvelAPI'),
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
