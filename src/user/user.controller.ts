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
import { UserEntity } from './entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { encryptPassword, makeSalt } from 'src/utils/cryptogram';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('api/user')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('hello')
  async hello(): Promise<any> {
    return 'hello world';
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<any> {
    const { email, password } = createUserDto;
    const user: UserEntity = new UserEntity();
    user.email = email;
    user.salt = makeSalt();
    user.password = encryptPassword(password, user.salt);
    return await this.userService.register(user);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req): Promise<any> {
    const user: UserEntity = req.user;
    return this.authService.login(user);
  }
}
