import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { createUserDto } from './dto/createUser.dto';
import { IsObjectIdPipe } from 'nestjs-object-id/dist/pipes/is-object-id.pipe';
import { updateUserDto } from './dto/updateUser.dto';
import { loginUserDto } from './dto/loginUser.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body(new ValidationPipe()) UserDto: createUserDto) {
    return this.usersService.create(UserDto);
  }

  @Get()
  login(@Body(new ValidationPipe()) UserDto: loginUserDto) {
    return this.usersService.login(UserDto);
  }

  @Get(':id')
  findOne(@Param('id', IsObjectIdPipe) id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', IsObjectIdPipe) id: string, @Body(new ValidationPipe()) UserDto: updateUserDto) {
    return this.usersService.update(id, UserDto);
  }

  @Delete(':id')
  remove(@Param('id', IsObjectIdPipe) id: string) {
    return this.usersService.remove(id);
  }
}
