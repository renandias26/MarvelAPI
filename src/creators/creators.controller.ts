import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, ParseUUIDPipe } from '@nestjs/common';
import { CreatorsService } from './creators.service';
import { CreatorDto } from './dto/creator.dto';
import { IsObjectIdPipe } from 'nestjs-object-id/dist/pipes/is-object-id.pipe';

@Controller('creators')
export class CreatorsController {
  constructor(private readonly creatorsService: CreatorsService) { }

  @Post()
  create(@Body(new ValidationPipe()) CreatorDto: CreatorDto) {
    return this.creatorsService.create(CreatorDto);
  }

  @Get()
  findAll() {
    return this.creatorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', IsObjectIdPipe) id: string) {
    return this.creatorsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', IsObjectIdPipe) id: string, @Body(new ValidationPipe()) CreatorDto: CreatorDto) {
    return this.creatorsService.update(id, CreatorDto);
  }

  @Delete(':id')
  remove(@Param('id', IsObjectIdPipe) id: string) {
    return this.creatorsService.remove(id);
  }
}
