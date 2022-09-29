import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/entity/user.entity';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TradeCateEntity } from './trade-cate/entity/trade-cate.entity';
import { TradeCateModule } from './trade-cate/trade-cate.module';
import { UserToTradeCateEntity } from './trade-cate/entity/user-to-trade-cate.entity';
import { AccountModule } from './account/account.module';
import { AccountEntity } from './account/entity/account.entity';
import { TradeEntity } from './trade/entity/trade.entity';
import { TradeModule } from './trade/trade.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      entities: [
        UserEntity,
        TradeCateEntity,
        UserToTradeCateEntity,
        AccountEntity,
        TradeEntity,
      ],
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'zhangrh0722',
      database: 'account',
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    TradeCateModule,
    AccountModule,
    TradeModule,
  ],
})
export class AppModule {}
