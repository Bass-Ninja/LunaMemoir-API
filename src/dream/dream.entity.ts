import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MoodEnum } from './mood.enum';
import { User } from '../auth/user.entity';

@Entity()
export class Dream {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column('simple-array')
  tags: string[];

  @CreateDateColumn()
  date: Date;

  @Column()
  mood: MoodEnum;

  @ManyToOne(() => User, (user) => user.dreams)
  @JoinColumn({ name: 'user' })
  user: User;
}
