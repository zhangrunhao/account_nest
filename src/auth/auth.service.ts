import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entity/user';
import { UserService } from 'src/user/user.service';
import { encryptPassword } from 'src/utils/cryptogram';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * 检索用户, 并验证密码
   * @param email 需要验证的邮箱
   * @param pass 需要验证的密码
   * @returns 用户信息 / null
   */
  async validateUser(email: string, pass: string): Promise<User> {
    const userDB: User = await this.userService.findOneByEmail(email);
    if (userDB && userDB.password === encryptPassword(pass, userDB.salt)) {
      return userDB;
    }
    return null;
  }

  /**
   * 登录加密
   * @param user 用户信息
   * @returns access_token
   */
  async login(user: User): Promise<any> {
    const payload = {
      email: user.email,
      id: user.id,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
