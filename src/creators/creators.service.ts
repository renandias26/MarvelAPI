import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { CreateCreatorDto } from './dto/create-creator.dto';
import { UpdateCreatorDto } from './dto/update-creator.dto';
import { MarvelAPIService } from 'src/marvelAPI/marvelApi.service';

@Injectable()
export class CreatorsService {
  constructor(
    private readonly marvelAPI: MarvelAPIService,
  ) { }

  create(createCreatorDto: CreateCreatorDto) {
    return 'This action adds a new creator';
  }

  async findAll(): Promise<any> {
    const url = await this.marvelAPI.get<any>('creators/63')
    return url
  }

  findOne(id: number) {
    return `This action returns a #${id} creator`;
  }

  update(id: number, updateCreatorDto: UpdateCreatorDto) {
    return `This action updates a #${id} creator`;
  }

  remove(id: number) {
    return `This action removes a #${id} creator`;
  }
}
