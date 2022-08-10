import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  getHello(): Promise<string> {
    return Promise.resolve('Hello world');
  }

  async register(user: User): Promise<void> {
    const dbUser: User = await this.findOneByEmail(user.email);
    if (dbUser) {
      throw new HttpException(
        {
          message: '邮箱已注册',
        },
        400,
      );
    }
    return this.create(user);
  }

  async login(user: User): Promise<any> {
    const dbUser: User = await this.findOneByEmail(user.email);
    if (!dbUser) {
      throw new HttpException(
        {
          message: '用户不存在',
        },
        400,
      );
    }
    if (dbUser.password !== user.password) {
      throw new HttpException(
        {
          message: '密码错误',
        },
        400,
      );
    }
    // TODO: 此处应该产生token, 返回token
    return {
      token: 'my-token',
    };
  }

  async create(user: User): Promise<void> {
    await this.usersRepository.save(user);
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOneBy({
      email,
    });
  }
}
