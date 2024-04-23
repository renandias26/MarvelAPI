import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, ParseUUIDPipe } from '@nestjs/common';
import { CreatorsService } from './creators.service';
import { CreatorDto } from './dto/creator.dto';
import { IsObjectIdPipe } from 'nestjs-object-id/dist/pipes/is-object-id.pipe';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('creators')
@Controller('creators')
export class CreatorsController {
  constructor(private readonly creatorsService: CreatorsService) { }

  @Post()
  @ApiOkResponse()
  @ApiBadRequestResponse()
  create(@Body(new ValidationPipe()) CreatorDto: CreatorDto) {
    return this.creatorsService.create(CreatorDto);
  }

  @Get()
  @ApiOkResponse()
  @ApiBadRequestResponse()
  findAll() {
    return this.creatorsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse()
  @ApiBadRequestResponse()
  findOne(@Param('id', IsObjectIdPipe) id: string) {
    return this.creatorsService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse()
  @ApiBadRequestResponse()
  update(@Param('id', IsObjectIdPipe) id: string, @Body(new ValidationPipe()) CreatorDto: CreatorDto) {
    return this.creatorsService.update(id, CreatorDto);
  }

  @Delete(':id')
  @ApiOkResponse()
  @ApiBadRequestResponse()
  remove(@Param('id', IsObjectIdPipe) id: string) {
    return this.creatorsService.remove(id);
  }
}
