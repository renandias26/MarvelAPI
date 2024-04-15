import { Module } from '@nestjs/common/decorators/modules/module.decorator';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { CreatorsService } from './creators.service';
import { CreatorsController } from './creators.controller';
import { MarvelAPIModule } from 'src/marvelAPI/marvelApi.module';
import { Creator, CreatorSchema } from './entities/creator.entity';

@Module({
  imports: [
    MarvelAPIModule,
  ],
  controllers: [CreatorsController],
  providers: [CreatorsService],
})
export class CreatorsModule { }
