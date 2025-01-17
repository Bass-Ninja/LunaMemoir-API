import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Dream } from '../dream/dream.entity';

@Entity()
export class DreamSymbol {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;

  @ManyToMany(() => Dream, (dream) => dream.symbols)
  dreams?: Dream[];
}
