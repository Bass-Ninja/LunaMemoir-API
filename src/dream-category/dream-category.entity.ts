import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DreamCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
}
