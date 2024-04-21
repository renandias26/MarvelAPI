import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { CharacterDto } from './dto/character.dto';
import { IsObjectIdPipe } from 'nestjs-object-id/dist/pipes/is-object-id.pipe';

@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) { }

  @Post()
  create(@Body(new ValidationPipe()) CharacterDto: CharacterDto) {
    return this.charactersService.create(CharacterDto);
  }

  @Get()
  findAll() {
    return this.charactersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', IsObjectIdPipe) id: string) {
    return this.charactersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', IsObjectIdPipe) id: string, @Body(new ValidationPipe()) CharacterDto: CharacterDto) {
    return this.charactersService.update(id, CharacterDto);
  }

  @Delete(':id')
  remove(@Param('id', IsObjectIdPipe) id: string) {
    return this.charactersService.remove(id);
  }
}
