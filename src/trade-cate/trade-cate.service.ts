import { HttpException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entity/user.entity';
import { Connection, Repository } from 'typeorm';
import { TradeCateEntity } from './entity/trade-cate.entity';
import { UserToTradeCateEntity } from './entity/user-to-trade-cate.entity';

@Injectable()
export class TradeCateService {
  private readonly logger = new Logger(TradeCateService.name);

  constructor(
    @InjectRepository(TradeCateEntity)
    private tradeCateRepository: Repository<TradeCateEntity>,

    @InjectRepository(UserToTradeCateEntity)
    private userToTradeCateRepository: Repository<UserToTradeCateEntity>,

    private connection: Connection,
  ) {}

  async create(user: UserEntity, tradeCate: TradeCateEntity): Promise<void> {
    const userToTradeCate: UserToTradeCateEntity = new UserToTradeCateEntity();
    userToTradeCate.user_id = user.id;

    // 1. 事务的第一种方式
    // const queryRunner: QueryRunner = this.connection.createQueryRunner();
    // queryRunner.connect();
    // queryRunner.startTransaction();
    // try {
    //   const tradeCateNew: TradeCateEntity = await queryRunner.manager.save(
    //     tradeCate,
    //   );
    //   userToTradeCate.trade_cate_id = tradeCateNew.id;
    //   queryRunner.manager.save(userToTradeCate);
    //   await queryRunner.commitTransaction();
    // } catch (error) {
    //   await queryRunner.rollbackTransaction();
    // }

    // 2. 事务的第二种方式
    await this.connection.transaction(async (manager) => {
      const tradeCateNew: TradeCateEntity = await manager.save(tradeCate);
      userToTradeCate.trade_cate_id = tradeCateNew.id;
      await manager.save(userToTradeCate);
    });
  }

  async judgeIsDeleted(id: number): Promise<void> {
    const tradeCate: TradeCateEntity = await this.tradeCateRepository.findOneBy(
      {
        id,
      },
    );
    if (!tradeCate) {
      throw new HttpException(
        {
          message: 'TradeCate不存在或者已被删除',
        },
        400,
      );
    }
  }

  async update(tradeCate: TradeCateEntity): Promise<void> {
    await this.judgeIsDeleted(tradeCate.id);
    await this.tradeCateRepository.update(
      {
        id: tradeCate.id,
      },
      tradeCate,
    );
  }

  async delete(userId: number, tradeCateId: number): Promise<void> {
    await this.judgeIsDeleted(tradeCateId);
    await this.connection.transaction(async () => {
      await this.tradeCateRepository.update(
        {
          id: tradeCateId,
        },
        {
          delete_at: new Date(),
        },
      );
      await this.userToTradeCateRepository.update(
        {
          user_id: userId,
          trade_cate_id: tradeCateId,
        },
        {
          delete_at: new Date(),
        },
      );
    });
  }

  async getById(tradeId: number): Promise<TradeCateEntity> {
    await this.judgeIsDeleted(tradeId);
    return await this.tradeCateRepository.findOne({
      where: {
        id: tradeId,
      },
    });
  }

  async getList(userId: number): Promise<TradeCateEntity[]> {
    const userToTradeCateArr: UserToTradeCateEntity[] =
      await this.userToTradeCateRepository.findBy({
        user_id: userId,
      });
    const tradeCateArray: TradeCateEntity[] = await Promise.all(
      userToTradeCateArr.map((userToTradeCate: UserToTradeCateEntity) => {
        return this.tradeCateRepository.findOneBy({
          id: userToTradeCate.trade_cate_id,
        });
      }),
    );
    return tradeCateArray;
  }
}
