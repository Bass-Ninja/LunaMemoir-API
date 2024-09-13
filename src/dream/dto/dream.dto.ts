import { Expose, Type } from 'class-transformer';
import { UserDto } from '../../auth/dto/user-dto';
import { ApiProperty } from '@nestjs/swagger';
import { SymbolDto } from '../../symbol/dto/symbol.dto';
import { MoodEnum } from './mood.enum';
import { IsEnum } from 'class-validator';
import { DreamCategoryDto } from '../../dream-category/dto/dream-category.dto';

export class DreamDto {
  @Expose()
  @ApiProperty()
  id: string;

  @Expose()
  @ApiProperty()
  title: string;

  @Expose()
  @ApiProperty()
  description: string;

  @Expose()
  @IsEnum(MoodEnum)
  @ApiProperty()
  mood: MoodEnum;

  @Expose()
  @ApiProperty()
  @Type(() => DreamCategoryDto)
  category: DreamCategoryDto;

  @Expose()
  @ApiProperty()
  @Type(() => SymbolDto)
  symbols: SymbolDto[];

  @Expose()
  @ApiProperty()
  @Type(() => UserDto)
  user: UserDto;
}
