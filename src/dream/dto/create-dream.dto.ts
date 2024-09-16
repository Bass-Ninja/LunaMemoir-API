import { IsNotEmpty, ValidateNested } from 'class-validator';
import { SymbolDto } from '../../symbol/dto/symbol.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { DreamCategoryDto } from '../../dream-category/dto/dream-category.dto';
import { MoodDto } from '../../mood/dto/mood.dto';

export class CreateDreamDto {
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsNotEmpty()
  @ApiProperty()
  description: string;

  @ApiProperty()
  @ValidateNested()
  @Type(() => MoodDto)
  mood: MoodDto;

  @ApiProperty()
  @ValidateNested()
  @Type(() => DreamCategoryDto)
  category: DreamCategoryDto;

  @ValidateNested({ each: true })
  @Type(() => SymbolDto)
  @ApiProperty({ type: [SymbolDto], required: false })
  symbols?: SymbolDto[];
}
