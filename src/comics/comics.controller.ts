import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { ComicsService } from './comics.service';
import { ComicDto } from './dto/comic.dto';
import { IsObjectIdPipe } from 'nestjs-object-id/dist/pipes/is-object-id.pipe';

@Controller('comics')
export class ComicsController {
  constructor(private readonly comicsService: ComicsService) { }

  @Post()
  create(@Body(new ValidationPipe()) ComicDto: ComicDto) {
    return this.comicsService.create(ComicDto);
  }

  @Get()
  findAll() {
    return this.comicsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', IsObjectIdPipe) id: string) {
    return this.comicsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', IsObjectIdPipe) id: string, @Body(new ValidationPipe()) ComicDto: ComicDto) {
    return this.comicsService.update(id, ComicDto);
  }

  @Delete(':id')
  remove(@Param('id', IsObjectIdPipe) id: string) {
    return this.comicsService.remove(id);
  }
}
