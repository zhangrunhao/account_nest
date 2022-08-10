import { AbstractEntity } from 'src/entity/abstract.entity';
import { TradeCateType } from 'src/enum/trade-cate-type.enum';
import { TradeOperation } from 'src/enum/trade-operation.enum';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class TradeCate extends AbstractEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  icon: string;

  @Column()
  type: TradeCateType;

  @Column()
  operate: TradeOperation;
}
