import { Injectable } from '@nestjs/common';
import { ComicDto } from './dto/comic.dto';
import { Comic } from './schemas/comic.schema';
import { MarvelAPIService } from 'src/marvelAPI/marvelApi.service';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose/dist/common/mongoose.decorators';
import { serieComic } from './interfaces/serieComic.interface';
import { MarvelRequest } from 'src/marvelAPI/interfaces/marvelRequest.interface';
import { detailComic } from './interfaces/detailComic.interface';

@Injectable()
export class ComicsService {
  constructor(
    private readonly marvelAPI: MarvelAPIService,
    @InjectModel(Comic.name) private comicModel: Model<Comic>
  ) { }

  create(ComicDto: ComicDto) {
    return new this.comicModel(ComicDto).save()
  }

  async findAll(): Promise<Comic[]> {
    const comic = await this.comicModel.find()

    if (comic.length > 0) {
      return comic
    }

    const comics = await this.getComicsAPI()
    new this.comicModel(comics).save()
    return [comics]
  }

  private async getComicsAPI(): Promise<Comic> {
    return this.marvelAPI.getSecretWars().then(serieData => {
      return this.buildComic(serieData.comics)
    })
  }

  private async buildComic(comic: serieComic): Promise<Comic> {
    const detail = await this.marvelAPI.get<MarvelRequest<detailComic>>(
      comic.collectionURI
    ).then(item => item.data.results.at(0))

    return new this.comicModel({
      format: detail.format,
      idApi: detail.id,
      imagePath: `${detail.thumbnail.path}.${detail.thumbnail.extension}`,
      pageCount: detail.pageCount,
      title: detail.title,
      dateOnStart: detail.dates.at(0).date
    })
  }

  findOne(id: string) {
    return this.comicModel.findById(id)
  }

  update(id: string, ComicDto: ComicDto) {
    return this.comicModel.findByIdAndUpdate(id, ComicDto)
  }

  remove(id: string) {
    return this.comicModel.findByIdAndDelete(id)
  }
}
