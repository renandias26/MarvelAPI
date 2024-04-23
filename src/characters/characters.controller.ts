import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { CharacterDto } from './dto/character.dto';
import { IsObjectIdPipe } from 'nestjs-object-id/dist/pipes/is-object-id.pipe';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('characters')
@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) { }

  @Post()
  @ApiOkResponse()
  @ApiBadRequestResponse()
  create(@Body(new ValidationPipe()) CharacterDto: CharacterDto) {
    return this.charactersService.create(CharacterDto);
  }

  @Get()
  @ApiOkResponse()
  @ApiBadRequestResponse()
  findAll() {
    return this.charactersService.findAll();
  }

  @Get(':id')
  @ApiOkResponse()
  @ApiBadRequestResponse()
  findOne(@Param('id', IsObjectIdPipe) id: string) {
    return this.charactersService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse()
  @ApiBadRequestResponse()
  update(@Param('id', IsObjectIdPipe) id: string, @Body(new ValidationPipe()) CharacterDto: CharacterDto) {
    return this.charactersService.update(id, CharacterDto);
  }

  @Delete(':id')
  @ApiOkResponse()
  @ApiBadRequestResponse()
  remove(@Param('id', IsObjectIdPipe) id: string) {
    return this.charactersService.remove(id);
  }
}
