import { IsEnum, IsNotEmpty, ValidateNested } from 'class-validator';
import { MoodEnum } from './mood.enum';
import { SymbolDto } from '../../symbol/dto/symbol.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { DreamCategoryDto } from '../../dream-category/dto/dream-category.dto';

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

  @ApiProperty()
  @ValidateNested()
  @Type(() => DreamCategoryDto)
  category: DreamCategoryDto;

  @ValidateNested({ each: true })
  @Type(() => SymbolDto)
  @ApiProperty({ type: [SymbolDto], required: false })
  symbols?: SymbolDto[];
}
