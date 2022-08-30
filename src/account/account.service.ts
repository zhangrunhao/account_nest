import { HttpException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountEntity } from './entity/account.entity';

@Injectable()
export class AccountService {
  private readonly logger = new Logger(AccountService.name);

  constructor(
    @InjectRepository(AccountEntity)
    private accountRepository: Repository<AccountEntity>,
  ) {}

  async create(account: AccountEntity) {
    await this.accountRepository.save(account);
  }

  async validateAccount(id: number, userId: number): Promise<void> {
    const account: AccountEntity = await this.accountRepository.findOneBy({
      id,
      userId,
    });
    if (!account) {
      throw new HttpException(
        {
          message: 'Account不存在或者已被删除',
        },
        400,
      );
    }
  }

  async update(account: AccountEntity): Promise<void> {
    await this.validateAccount(account.id, account.userId);
    await this.accountRepository.update(
      {
        id: account.id,
      },
      account,
    );
  }

  async delete(id: number, userId: number): Promise<void> {
    await this.validateAccount(id, userId);
    await this.accountRepository.update(
      {
        id,
      },
      {
        delete_at: new Date(),
      },
    );
  }

  async getById(id: number, userId: number): Promise<AccountEntity> {
    await this.validateAccount(id, userId);
    return await this.accountRepository.findOne({
      where: {
        id,
      },
    });
  }

  async getList(userId: number): Promise<AccountEntity[]> {
    return await this.accountRepository.findBy({
      userId,
    });
  }
}
