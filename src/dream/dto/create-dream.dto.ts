import { IsEnum, IsNotEmpty, ValidateNested } from 'class-validator';
import { MoodEnum } from './mood.enum';
import { SymbolDto } from '../../symbol/dto/symbol.dto';
import { ApiProperty } from '@nestjs/swagger';
import { DreamCategoryEnum } from './dream-category.enum';
import { Type } from 'class-transformer';

export class CreateDreamDto {
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsNotEmpty()
  @ApiProperty()
  description: string;

  @IsEnum(MoodEnum)
  @ApiProperty({ enum: MoodEnum })
  mood: MoodEnum;

  @IsEnum(DreamCategoryEnum)
  @ApiProperty({ enum: DreamCategoryEnum })
  category: DreamCategoryEnum;

  @ValidateNested({ each: true })
  @Type(() => SymbolDto)
  @ApiProperty({ type: [SymbolDto], required: false })
  symbols?: SymbolDto[];
}
