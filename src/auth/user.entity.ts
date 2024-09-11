import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Dream } from '../dream/dream.entity';
import { IsEmail } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  password: string;

  @OneToMany(() => Dream, (dream) => dream.user)
  dreams: Dream[];
}
