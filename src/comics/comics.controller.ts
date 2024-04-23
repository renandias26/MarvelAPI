import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { ComicsService } from './comics.service';
import { ComicDto } from './dto/comic.dto';
import { IsObjectIdPipe } from 'nestjs-object-id/dist/pipes/is-object-id.pipe';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('comics')
@Controller('comics')
export class ComicsController {
  constructor(private readonly comicsService: ComicsService) { }

  @Post()
  @ApiOkResponse()
  @ApiBadRequestResponse()
  create(@Body(new ValidationPipe()) ComicDto: ComicDto) {
    return this.comicsService.create(ComicDto);
  }

  @Get()
  @ApiOkResponse()
  @ApiBadRequestResponse()
  findAll() {
    return this.comicsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse()
  @ApiBadRequestResponse()
  findOne(@Param('id', IsObjectIdPipe) id: string) {
    return this.comicsService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse()
  @ApiBadRequestResponse()
  update(@Param('id', IsObjectIdPipe) id: string, @Body(new ValidationPipe()) ComicDto: ComicDto) {
    return this.comicsService.update(id, ComicDto);
  }

  @Delete(':id')
  @ApiOkResponse()
  @ApiBadRequestResponse()
  remove(@Param('id', IsObjectIdPipe) id: string) {
    return this.comicsService.remove(id);
  }
}
