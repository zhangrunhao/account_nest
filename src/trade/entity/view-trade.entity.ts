import { AccountEntity } from 'src/account/entity/account.entity';
import { TradeCateEntity } from 'src/trade-cate/entity/trade-cate.entity';
import { Connection, ViewColumn, ViewEntity } from 'typeorm';
import { TradeEntity } from './trade.entity';

@ViewEntity({
  expression(connection: Connection) {
    return connection
      .createQueryBuilder()
      .select('trade.id', 'id')
      .addSelect('trade.money', 'money')
      .addSelect('trade.remark', 'remark')
      .addSelect('trade.spend_date', 'spend_date')
      .addSelect('account.name', 'account_name')
      .addSelect('account.id', 'account_id')
      .addSelect('trade_cate.id', 'trade_cate_id')
      .addSelect('trade_cate.name', 'trade_cate_name')
      .addSelect('trade.operate', 'operate')
      .addSelect('trade.user_id', 'user_id')
      .from(TradeEntity, 'trade')
      .leftJoin(AccountEntity, 'account', 'account.id = trade.account_id')
      .leftJoin(
        TradeCateEntity,
        'trade_cate',
        'trade_cate.id = trade.trade_cate_id',
      );
  },
})
export class ViewTradeEntity {
  @ViewColumn()
  id: number;

  @ViewColumn()
  money: number;

  @ViewColumn()
  remark: string;

  @ViewColumn()
  spend_date: Date;

  @ViewColumn()
  account_name: string;

  @ViewColumn()
  trade_cate_name: string;

  @ViewColumn()
  trade_cate_id: number;

  @ViewColumn()
  account_id: number;

  @ViewColumn()
  operate: number;

  @ViewColumn()
  user_id: number;
}
