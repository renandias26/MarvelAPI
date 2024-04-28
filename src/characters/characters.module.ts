import { Module } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { CharactersController } from './characters.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Character, CharacterSchema } from './schemas/character.schema';
import { MarvelAPIModule } from 'src/marvelAPI/marvelApi.module';

@Module({
  imports: [
    MarvelAPIModule,
    MongooseModule.forFeature([{ name: Character.name, schema: CharacterSchema }])
  ],
  controllers: [CharactersController],
  providers: [CharactersService],
})
export class CharactersModule { }
