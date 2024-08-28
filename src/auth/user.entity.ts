import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Dream } from '../dream/dream.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  // eslint-disable-next-line
  @OneToMany((_type) => Dream, (dream) => dream.user, { eager: true })
  dreams: Dream[];
}
