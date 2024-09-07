import { IsEnum, IsNotEmpty } from 'class-validator';
import { MoodEnum } from './mood.enum';
import { SymbolDto } from '../../symbol/dto/symbol-dto';

export class CreateDreamDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsEnum(MoodEnum)
  mood: MoodEnum;

  symbols?: SymbolDto[];
}
