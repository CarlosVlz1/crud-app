import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  ValidationPipe,
  UsePipes,
  HttpCode,
  HttpStatus,
  Patch,
  UseInterceptors,
} from '@nestjs/common'
import { UserService } from '../services/user.service'
import { RequestUserDto } from '../dtos/request-user.dto'
import { ExcludeFieldsInterceptor } from '../../common/exclude-fields.interceptor'

@UseInterceptors(ExcludeFieldsInterceptor)
@UsePipes(new ValidationPipe({ transform: true }))
@Controller('/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return this.userService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUser: RequestUserDto) {
    return this.userService.create(createUser);
  }

  @Patch('/:id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() User: RequestUserDto) {
    return await this.userService.update(id, User)
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteById(@Param('id') id: string) {
    await this.userService.deleteById(id)
  }
}
