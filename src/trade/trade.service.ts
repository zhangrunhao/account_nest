import { HttpException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TradeEntity } from './entity/trade.entity';

@Injectable()
export class TradeService {
  private readonly logger = new Logger(TradeService.name);

  constructor(
    @InjectRepository(TradeEntity)
    private tradeRepository: Repository<TradeEntity>,
  ) {}

  async create(trade: TradeEntity): Promise<void> {
    // TODO: 检查cate, account等是否正确
    await this.tradeRepository.save(trade);
  }

  async update(trade: TradeEntity): Promise<void> {
    await this.checkIsDeleted(trade.id);
    await this.tradeRepository.update(
      {
        id: trade.id,
      },
      trade,
    );
  }

  async delete(tradeId: number): Promise<void> {
    await this.checkIsDeleted(tradeId);
    // TODO: 删除, 不应该更新update_at
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

  async list(
    userId: number,
    tradeCateId?: number,
    accountId?: number,
    operate?: number,
    spendDate?: Date,
  ): Promise<TradeEntity[]> {
    this.logger.debug(spendDate);
    return await this.tradeRepository.find({
      where: {
        userId,
        accountId,
        operate,
        spendDate,
        tradeCateId,
      },
    });
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