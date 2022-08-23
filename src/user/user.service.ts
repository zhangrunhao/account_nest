import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async register(user: UserEntity): Promise<void> {
    const dbUser: UserEntity = await this.findOneByEmail(user.email);
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

  async create(user: UserEntity): Promise<void> {
    await this.usersRepository.save(user);
  }

  async findOneByEmail(email: string): Promise<UserEntity> {
    return await this.usersRepository.findOneBy({
      email,
    });
  }

  async findOneById(id: number): Promise<UserEntity> {
    return await this.usersRepository.findOneBy({
      id,
    });
  }
}
