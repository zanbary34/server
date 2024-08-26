import { Files } from 'src/files/entities/file.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  Relation,
} from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  u_id: number;

  @Column()
  u_name: string;

  @OneToMany(() => Files, (file) => file.user)
  files: Relation<Files[]>;
}
