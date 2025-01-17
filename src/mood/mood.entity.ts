import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Mood {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
}
