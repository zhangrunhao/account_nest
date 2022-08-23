import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/entity/user.entity';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TradeCateEntity } from './trade-cate/entity/trade-cate.entity';
import { TradeCateModule } from './trade-cate/trade-cate.module';
import { UserToTradeCateEntity } from './trade-cate/entity/user-to-trade-cate.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      entities: [UserEntity, TradeCateEntity, UserToTradeCateEntity],
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
  ],
})
export class AppModule {}
