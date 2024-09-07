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

  @OneToMany(() => Dream, (dream) => dream.user)
  dreams: Dream[];
}
