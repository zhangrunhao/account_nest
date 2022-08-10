import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AbstractEntity } from 'src/entity/abstract.entity';

@Entity()
export class User extends AbstractEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  salt: string;
}
