import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { createUserDto } from './dto/createUser.dto';
import { IsObjectIdPipe } from 'nestjs-object-id/dist/pipes/is-object-id.pipe';
import { updateUserDto } from './dto/updateUser.dto';
import { loginUserDto } from './dto/loginUser.dto';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @ApiOkResponse()
  @ApiBadRequestResponse()
  create(@Body(new ValidationPipe()) UserDto: createUserDto) {
    return this.usersService.create(UserDto);
  }

  @Get()
  @ApiOkResponse()
  @ApiBadRequestResponse()
  login(@Body(new ValidationPipe()) UserDto: loginUserDto) {
    return this.usersService.login(UserDto);
  }

  @Get(':id')
  @ApiOkResponse()
  @ApiBadRequestResponse()
  findOne(@Param('id', IsObjectIdPipe) id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse()
  @ApiBadRequestResponse()
  update(@Param('id', IsObjectIdPipe) id: string, @Body(new ValidationPipe()) UserDto: updateUserDto) {
    return this.usersService.update(id, UserDto);
  }

  @Delete(':id')
  @ApiOkResponse()
  @ApiBadRequestResponse()
  remove(@Param('id', IsObjectIdPipe) id: string) {
    return this.usersService.remove(id);
  }
}
