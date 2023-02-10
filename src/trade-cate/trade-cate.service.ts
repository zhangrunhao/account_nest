import { HttpException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entity/user.entity';
import { Connection, Repository, EntityManager } from 'typeorm';
import { TradeCateEntity } from './entity/trade-cate.entity';
import { UserToTradeCateEntity } from './entity/user-to-trade-cate.entity';
import { TradeCateType } from '../enum/trade-cate-type.enum';

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

  async adminCreate(tradeCate: TradeCateEntity) {
    await this.tradeCateRepository.save(tradeCate);
  }

  async create(user: UserEntity, tradeCate: TradeCateEntity): Promise<void> {
    const userToTradeCate: UserToTradeCateEntity = new UserToTradeCateEntity();
    userToTradeCate.user_id = user.id;
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
    // TODO: 判断用户和这个id之间, 是否有关系
    if (!tradeCate) {
      throw new HttpException(
        {
          message: 'TradeCate不存在或者已被删除',
        },
        400,
      );
    }
  }

  async update(tradeCate: TradeCateEntity, user: UserEntity): Promise<void> {
    await this.judgeIsDeleted(tradeCate.id);
    const tradeCateDB: TradeCateEntity = await this.getById(tradeCate.id);
    if (tradeCateDB.type === TradeCateType.Default) {
      await this.connection.transaction(async (manager: EntityManager) => {
        // 1. 删除用户和这个默认分类的关系
        await manager.update(
          UserToTradeCateEntity,
          {
            user_id: user.id,
            trade_cate_id: tradeCate.id,
          },
          {
            delete_at: new Date(),
          },
        );
        // 2. 再添加一个扩展类型
        const tradeCateNew: TradeCateEntity = new TradeCateEntity();
        tradeCateNew.icon = tradeCate.icon;
        tradeCateNew.name = tradeCate.name;
        tradeCateNew.operate = tradeCate.operate;
        tradeCateNew.type = TradeCateType.Extra;
        const tradeCateResult: TradeCateEntity =
          await manager.save<TradeCateEntity>(tradeCateNew);
        // 3. 再加上这个用户之间的关系
        const userToTradeCateNew: UserToTradeCateEntity =
          new UserToTradeCateEntity();
        userToTradeCateNew.user_id = user.id;
        userToTradeCateNew.trade_cate_id = tradeCateResult.id;
        await manager.save(userToTradeCateNew);
      });
    } else if (tradeCateDB.type === TradeCateType.Extra) {
      // 或者的直接更新
      await this.tradeCateRepository.update(
        {
          id: tradeCate.id,
        },
        tradeCate,
      );
      await this.getById(tradeCate.id);
    } else if (tradeCateDB.type === TradeCateType.System) {
      // 系统的, 不应该走到这里, 直接报错即可
    }
  }

  async delete(userId, tradeCateId): Promise<void> {
    await this.userToTradeCateRepository.update(
      {
        user_id: userId,
        trade_cate_id: tradeCateId,
      },
      {
        delete_at: new Date(),
      },
    );
  }

  async getById(tradeCateId: number): Promise<TradeCateEntity> {
    await this.judgeIsDeleted(tradeCateId);
    return await this.tradeCateRepository.findOne({
      where: {
        id: tradeCateId,
      },
    });
  }

  async getUserToTradeCate(
    tradeCateId: number,
    userId: number,
  ): Promise<UserToTradeCateEntity> {
    // 首先判断这个cate是否存在
    await this.judgeIsDeleted(tradeCateId);
    return await this.userToTradeCateRepository.findOne({
      where: {
        user_id: userId,
        trade_cate_id: tradeCateId,
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
