import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AddUserDto } from './dto/add-user.dto';
import { ConfigService } from '@nestjs/config';

@ApiTags('用户')
@Controller({
  path: 'user',
  version: '1',
})
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  @Get('getTestName')
  @ApiOperation({
    summary: '我只是一个Test',
  })
  getTestName() {
    return this.configService.get('TEST_VALUE').name;
  }

  @ApiOperation({
    summary: '新增用户',
  })
  @Post('/add')
  create(@Body() user: AddUserDto) {
    console.log('create', user);
    return this.userService.createOrSave(user);
  }
}
