import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Relation,
} from 'typeorm';
import { Files } from './file.entity';

@Entity()
export class Customers {
  @PrimaryGeneratedColumn()
  c_id: number;

  @Column()
  c_name: string;

  @Column()
  c_email: string;

  @Column()
  c_israeli_id: string;

  @Column()
  f_id: number;

  @ManyToOne(() => Files, (file) => file.customers, { onDelete: 'CASCADE' })
  file: Relation<Files>;
}
