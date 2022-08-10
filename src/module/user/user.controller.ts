import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entity/user';
import { CreateUserDto } from './dto/create-user.dto';
import { encryptPassword, makeSalt } from 'src/utils/cryptogram';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    const user: User = new User();
    user.email = email;
    user.salt = makeSalt();
    user.password = encryptPassword(password, user.salt);
    return await this.userService.register(user);
  }

  @Post('login')
  async login(@Body() createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    const user: User = new User();
    user.email = email;
    user.password = password;
    return await this.userService.login(user);
  }
}
