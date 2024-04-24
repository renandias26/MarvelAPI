import { Injectable } from '@nestjs/common';
import { CharacterDto } from './dto/character.dto';
import { MarvelAPIService } from 'src/marvelAPI/marvelApi.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Character } from './schemas/character.schema';
import { serieCharacter } from './interfaces/serieCharacter.interface';
import { detailCharacter } from './interfaces/detailCharacter.interface';
import { MarvelRequest } from 'src/marvelAPI/interfaces/marvelRequest.interface';

@Injectable()
export class CharactersService {
  constructor(
    private readonly marvelAPI: MarvelAPIService,
    @InjectModel(Character.name) private characterModel: Model<Character>
  ) { }

  create(CharacterDto: CharacterDto): Promise<Character> {
    return new this.characterModel(CharacterDto).save()
  }

  async findAll(): Promise<Character[]> {
    const character = await this.characterModel.find()

    if (character.length > 0) {
      return character
    }

    const characters = await this.getCharactersAPI()
    return await this.characterModel.insertMany(characters)
  }

  private async getCharactersAPI(): Promise<Character[]> {
    return this.marvelAPI.getSecretWars().then(serieData => this.builCharacter(serieData.characters))
  }

  private async builCharacter(character: serieCharacter): Promise<Character[]> {
    const detail = await this.marvelAPI.get<MarvelRequest<detailCharacter>>(
      character.collectionURI
    ).then(item => item.data.results)

    const characters: Character[] = []

    for (let item of detail) {
      characters.push({
        description: item.description,
        idApi: item.id,
        name: item.name,
        imagePath: `${item.thumbnail.path}.${item.thumbnail.extension}`
      })
    }
    return characters
  }

  findOne(id: string): Promise<Character> {
    return this.characterModel.findById(id)
  }

  update(id: string, CharacterDto: CharacterDto): Promise<Character> {
    return this.characterModel.findByIdAndUpdate(id, CharacterDto)
  }

  remove(id: string): Promise<Character> {
    return this.characterModel.findByIdAndDelete(id)
  }
}
