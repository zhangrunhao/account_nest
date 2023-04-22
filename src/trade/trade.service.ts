import { HttpException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TradeEntity } from './entity/trade.entity';
import { ViewTradeEntity } from './entity/view-trade.entity';

@Injectable()
export class TradeService {
  private readonly logger = new Logger(TradeService.name);

  constructor(
    @InjectRepository(TradeEntity)
    private tradeRepository: Repository<TradeEntity>,

    @InjectRepository(ViewTradeEntity)
    private viewTradeRepository: Repository<ViewTradeEntity>,
  ) {}

  async list(userId: number, query: any): Promise<ViewTradeEntity[]> {
    return await this.viewTradeRepository.find({
      where: {
        user_id: userId,
        ...query,
      },
    });
  }

  async listByAccountId(
    userId: number,
    accountId: number,
  ): Promise<ViewTradeEntity[]> {
    return await this.viewTradeRepository.find({
      where: {
        user_id: userId,
        account_id: accountId,
      },
    });
  }

  async create(trade: TradeEntity): Promise<void> {
    await this.tradeRepository.save(trade);
  }

  async update(trade: TradeEntity): Promise<void> {
    await this.checkIsDeleted(trade.id);
    await this.tradeRepository.update(
      {
        id: trade.id,
      },
      {
        accountId: trade.accountId,
        tradeCateId: trade.tradeCateId,
        remark: trade.remark,
        spendDate: trade.spendDate,
        operate: trade.operate,
        money: trade.money,
      },
    );
  }

  async delete(tradeId: number): Promise<void> {
    await this.checkIsDeleted(tradeId);
    await this.tradeRepository.update(
      {
        id: tradeId,
      },
      {
        delete_at: new Date(),
      },
    );
  }

  async checkIsDeleted(id: number): Promise<void> {
    const trade: TradeEntity = await this.tradeRepository.findOneBy({
      id,
    });
    if (!trade) {
      throw new HttpException(
        {
          message: 'trade不存在或已被删除',
        },
        400,
      );
    }
  }

  async detail(tradeId: number): Promise<TradeEntity> {
    await this.checkIsDeleted(tradeId);
    return await this.tradeRepository.findOne({
      where: {
        id: tradeId,
      },
    });
  }
}
