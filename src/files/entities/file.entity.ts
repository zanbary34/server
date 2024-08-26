import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  Relation,
} from 'typeorm';
import { Users } from '../../users/entities/user.entity';
import { Customers } from './customer.entity';

@Entity()
export class Files {
  @PrimaryGeneratedColumn()
  f_id: number;

  @Column()
  f_name: string;

  @Column()
  f_status: string; // e.g., "uploaded", "pending"

  @ManyToOne(() => Users, (user) => user.files, { onDelete: 'CASCADE' })
  user: Relation<Users>;

  @OneToMany(() => Customers, (customer) => customer.file)
  customers: Relation<Customers[]>;
}
