import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TradeEntity } from './entity/trade.entity';
import { ViewTradeEntity } from './entity/view-trade.entity';
import { TradeController } from './trade.controller';
import { TradeService } from './trade.service';

@Module({
  imports: [TypeOrmModule.forFeature([TradeEntity, ViewTradeEntity])],
  controllers: [TradeController],
  providers: [TradeService],
})
export class TradeModule {}
