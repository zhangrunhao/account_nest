import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/user/entity/user.entity';
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
  async validateUser(email: string, pass: string): Promise<UserEntity> {
    const userDB: UserEntity = await this.userService.findOneByEmail(email);
    if (userDB && userDB.password === encryptPassword(pass, userDB.salt)) {
      return userDB;
    }
    return null;
  }

  async validateUserExist(id: number): Promise<UserEntity> {
    return await this.userService.findOneById(id);
  }

  /**
   * 登录加密
   * @param user 用户信息
   * @returns access_token
   */
  async login(user: UserEntity): Promise<any> {
    const payload = {
      email: user.email,
      id: user.id,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
