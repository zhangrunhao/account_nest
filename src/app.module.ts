import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './module/user/user.module';

const businessModules = [UserModule];

const libModules = [
  TypeOrmModule.forRoot({
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: 'zhangrh0722',
    database: 'account',
    autoLoadEntities: true,
    synchronize: true,
  }),
];

@Module({
  imports: [...libModules, ...businessModules],
})
export class AppModule {}
