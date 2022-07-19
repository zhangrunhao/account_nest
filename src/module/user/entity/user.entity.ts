import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: Date })
  create_at: string;

  @Column({ type: Date, nullable: true })
  update_at: string;

  @Column({ type: Date, nullable: true })
  delete_at: string;
}
