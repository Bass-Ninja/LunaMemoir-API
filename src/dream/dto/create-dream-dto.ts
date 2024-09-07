import { IsEnum, IsNotEmpty } from 'class-validator';
import { MoodEnum } from '../mood.enum';

export class CreateDreamDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsEnum(MoodEnum)
  mood: MoodEnum;
}
