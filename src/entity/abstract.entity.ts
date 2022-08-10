import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export class AbstractEntity {
  @CreateDateColumn()
  create_at: Date;

  @UpdateDateColumn()
  update_at: Date;

  @DeleteDateColumn()
  delete_at: Date;
}
