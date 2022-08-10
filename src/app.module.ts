import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User as UserEntity } from './module/user/entity/user';
import { UserModule } from './module/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      entities: [UserEntity],
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'zhangrh0722',
      database: 'account',
      synchronize: true,
    }),
    UserModule,
  ],
})
export class AppModule {}
