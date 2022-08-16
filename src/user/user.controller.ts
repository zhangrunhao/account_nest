import { Body, Controller, Logger, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entity/user';
import { CreateUserDto } from './dto/create-user.dto';
import { encryptPassword, makeSalt } from 'src/utils/cryptogram';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/user')
export class UserController {
  private readonly logger = new Logger(UserController.name);

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

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    const user: User = new User();
    user.email = email;
    user.password = password;
    return 'await this.userService.login(user)';
  }
}
