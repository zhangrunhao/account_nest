import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TradeCateEntity } from './entity/trade-cate.entity';
import { UserToTradeCateEntity } from './entity/user-to-trade-cate.entity';
import { TradeCateController } from './trade-cate.controller';
import { TradeCateService } from './trade-cate.service';

@Module({
  imports: [TypeOrmModule.forFeature([TradeCateEntity, UserToTradeCateEntity])],
  controllers: [TradeCateController],
  providers: [TradeCateService],
})
export class TradeCateModule {}
