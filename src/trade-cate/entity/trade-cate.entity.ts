import { TradeCateType } from 'src/enum/trade-cate-type.enum';
import { TradeOperation } from 'src/enum/trade-operation.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AbstractEntity } from 'src/entity/abstract.entity';

@Entity({
  name: 'trade_cate',
})
export class TradeCateEntity extends AbstractEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  icon: string;

  /**
   * 类型
   * Default = 1, // 默认
   * Extra = 2, // 扩展
   * System = 3, // 系统
   */
  @Column({
    name: 'type',
    type: 'enum',
    enum: TradeCateType,
    nullable: false,
  })
  type: number;

  /**
   * 操作类型
   * 收入: 1
   * 支出: 2
   * 转入3, 转出4, 等等..
   */
  @Column({
    name: 'operate',
    type: 'enum',
    enum: TradeOperation,
  })
  operate: number;
}
