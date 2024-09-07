import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Dream } from '../dream/dream.entity';

@Entity()
export class DreamSymbol {
  @PrimaryGeneratedColumn('uuid')
  id: number;
  @Column()
  name: string;

  @ManyToMany(() => Dream, (dream) => dream.symbols)
  dreams?: Dream[];
}
