import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { CreatorDto } from './dto/creator.dto';
import { MarvelAPIService } from 'src/marvelAPI/marvelApi.service';
import { MarvelRequest } from 'src/marvelAPI/interfaces/marvelRequest.interface';
import { serieCreator } from './interfaces/serieCreator.inteface';
import { detailCreator } from './interfaces/detailCreator.interface';
import { comicCreator } from './interfaces/comicCreator.inteface';
import { Creator } from './schemas/creator.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose/dist/common/mongoose.decorators';

@Injectable()
export class CreatorsService {
  constructor(
    private readonly marvelAPI: MarvelAPIService,
    @InjectModel(Creator.name) private creatorModel: Model<Creator>
  ) { }

  create(CreatorDto: CreatorDto): Promise<Creator> {
    return new this.creatorModel(CreatorDto).save()
  }

  async findAll(): Promise<Creator[]> {

    let creators = await this.creatorModel.find()

    if (creators.length > 0) {
      return creators
    }

    const APIcreators = await this.getCreatorsAPI()
    new this.creatorModel(APIcreators).save()
    return [APIcreators]
  }

  private async getCreatorsAPI(): Promise<Creator> {
    return this.marvelAPI.getSecretWars().then(serieData => this.builCreator(serieData.creators))
  }

  private async builCreator(creator: serieCreator): Promise<Creator> {
    const detail = await this.marvelAPI.get<MarvelRequest<detailCreator>>(
      creator.collectionURI
    ).then(item => item.data.results.at(0))

    let comics: Promise<comicCreator[]>[] = []
    for (let count = 0; count < detail.comics.available; count = count + 100) {
      const comic = this.marvelAPI.get<MarvelRequest<comicCreator>>(
        detail.comics.collectionURI,
        new URLSearchParams({ limit: "100", offset: count.toString() })
      ).then(item => item.data.results)

      comics = comics.concat(comic)
    }

    return {
      fullName: detail.fullName,
      role: creator.items.at(0).role,
      idApi: detail.id,
      imagePath: `${detail.thumbnail.path}.${detail.thumbnail.extension}`,
      comics: (await Promise.all(comics)).flat(1).map(item => item.title)
    }
  }

  async findOne(id: string): Promise<Creator> {
    return this.creatorModel.findById(id)
  }

  update(id: string, CreatorDto: CreatorDto): Promise<Creator> {
    return this.creatorModel.findByIdAndUpdate(id, CreatorDto)

  }

  remove(id: string): Promise<Creator> {
    return this.creatorModel.findByIdAndDelete(id)
  }
}