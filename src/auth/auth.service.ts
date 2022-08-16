import { Injectable, Logger } from '@nestjs/common';
import { User } from 'src/user/entity/user';
import { UserService } from 'src/user/user.service';
import { encryptPassword } from 'src/utils/cryptogram';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(private readonly userService: UserService) {}

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
}
