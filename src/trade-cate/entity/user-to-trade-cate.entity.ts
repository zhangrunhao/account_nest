import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AbstractEntity } from 'src/entity/abstract.entity';

@Entity({
  name: 'user_to_trade_cate',
})
export class UserToTradeCateEntity extends AbstractEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  trade_cate_id: number;
}
