import { AbstractEntity } from 'src/entity/abstract.entity';
import { AccountCate } from 'src/enum/account-cate-enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'account',
})
export class AccountEntity extends AbstractEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'user_id',
  })
  userId: number;

  @Column()
  name: string;

  @Column({
    name: 'type',
    type: 'enum',
    enum: AccountCate,
    nullable: false,
  })
  cate: number;

  @Column()
  icon: string;
}
