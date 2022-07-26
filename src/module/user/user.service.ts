import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';

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
    if (dbUser) throw new Error('邮箱已注册');
    return this.create(user);
  }

  async create(user: User): Promise<void> {
    await this.usersRepository.save(user);
  }

  findOneByEmail(email: string): Promise<User> {
    return this.usersRepository.findOneBy({
      email,
    });
  }

  async findOne(id: number): Promise<User> {
    return await this.usersRepository.findOneBy({
      id,
    });
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
