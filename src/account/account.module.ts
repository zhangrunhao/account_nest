import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { AccountEntity } from './entity/account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AccountEntity])],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}
