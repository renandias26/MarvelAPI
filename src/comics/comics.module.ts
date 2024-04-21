import { Module } from '@nestjs/common';
import { ComicsService } from './comics.service';
import { ComicsController } from './comics.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Comic, ComicSchema } from './schemas/comic.schema';
import { MarvelAPIModule } from 'src/marvelAPI/marvelApi.module';

@Module({
  imports: [
    MarvelAPIModule,
    MongooseModule.forFeature([{ name: Comic.name, schema: ComicSchema }])
  ],
  controllers: [ComicsController],
  providers: [ComicsService],
})
export class ComicsModule { }
