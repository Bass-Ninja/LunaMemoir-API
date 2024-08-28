import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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

  @Column()
  date: Date;

  @Column()
  mood: MoodEnum;

  @ManyToOne(() => User, (user) => user.dreams)
  user: User;
}
