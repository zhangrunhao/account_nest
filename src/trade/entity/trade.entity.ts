import { AbstractEntity } from 'src/entity/abstract.entity';
import { TradeOperation } from 'src/enum/trade-operation.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'trade',
})
export class TradeEntity extends AbstractEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'user_id',
  })
  userId: number; // 用户id

  @Column({
    name: 'account_id',
  })
  accountId: number; // 账户id

  @Column({
    name: 'trade_cate_id',
  })
  tradeCateId: number; // 分类id

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  money: number; // 金额

  @Column({
    nullable: true,
  })
  remark: string; // 备注

  @Column({
    name: 'spend_date',
    type: 'date',
  })
  spendDate: Date; // 消费日期

  @Column({
    name: 'operate',
    type: 'enum',
    enum: TradeOperation,
  })
  operate: number;
}
