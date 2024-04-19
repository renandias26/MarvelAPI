import { Module } from '@nestjs/common/decorators/modules/module.decorator';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { CreatorsService } from './creators.service';
import { CreatorsController } from './creators.controller';
import { MarvelAPIModule } from 'src/marvelAPI/marvelApi.module';
import { Creator, CreatorSchema } from './schemas/creator.schema';

@Module({
  imports: [
    MarvelAPIModule,
    MongooseModule.forFeature([{ name: Creator.name, schema: CreatorSchema }])
  ],
  controllers: [CreatorsController],
  providers: [CreatorsService],
})
export class CreatorsModule { }
