import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MoodEnum } from './dto/mood.enum';
import { User } from '../auth/user.entity';
import { DreamSymbol } from '../symbol/symbol.entity';
import { DreamCategory } from '../dream-category/dream-category.entity';

@Entity()
export class Dream {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @ManyToMany(() => DreamSymbol, (symbol) => symbol.dreams, { cascade: true })
  @JoinTable({ name: 'dream_symbols' })
  symbols?: DreamSymbol[];

  @CreateDateColumn()
  date: Date;

  @Column({ type: 'enum', enum: MoodEnum, default: MoodEnum.OTHER })
  mood: MoodEnum;

  @ManyToOne(() => DreamCategory, {
    cascade: true,
  })
  @JoinColumn({ name: 'category' })
  category: DreamCategory;

  @ManyToOne(() => User, (user) => user.dreams)
  @JoinColumn({ name: 'user' })
  user: User;
}
