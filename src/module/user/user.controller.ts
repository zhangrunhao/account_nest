import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('hello')
  async hello(): Promise<string> {
    return await this.userService.getHello();
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    const user: User = new User();
    user.email = email;
    user.password = password;
    return await this.userService.register(user);
  }

  @Get('all')
  async findAll(): Promise<User[]> {
    const aa: User[] = await this.userService.findAll();
    return aa;
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User> {
    return await this.userService.findOne(id);
  }
}
