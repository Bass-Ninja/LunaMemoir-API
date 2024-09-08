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
import { DreamCategoryEnum } from './dto/dream-category.enum';

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

  @Column({
    type: 'enum',
    enum: DreamCategoryEnum,
    default: DreamCategoryEnum.OTHER,
  })
  category: DreamCategoryEnum;

  @ManyToOne(() => User, (user) => user.dreams)
  @JoinColumn({ name: 'user' })
  user: User;
}
