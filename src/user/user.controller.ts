import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entity/user';
import { CreateUserDto } from './dto/create-user.dto';
import { encryptPassword, makeSalt } from 'src/utils/cryptogram';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { AuthService } from 'src/auth/auth.service';

@Controller('api/user')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards()
  @Get('hello')
  async hello(): Promise<any> {
    return 'hello world';
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    const user: User = new User();
    user.email = email;
    user.salt = makeSalt();
    user.password = encryptPassword(password, user.salt);
    return await this.userService.register(user);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    const user: User = req.user;
    return this.authService.login(user);
  }
}
