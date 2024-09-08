import { Expose, Type } from 'class-transformer';
import { UserDto } from '../../auth/dto/user-dto';
import { ApiProperty } from '@nestjs/swagger';
import { SymbolDto } from '../../symbol/dto/symbol.dto';
import { MoodEnum } from './mood.enum';
import { DreamCategoryEnum } from './dream-category.enum';
import { IsEnum } from 'class-validator';

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
  @IsEnum(DreamCategoryEnum)
  @ApiProperty()
  category: DreamCategoryEnum;

  @Expose()
  @ApiProperty()
  @Type(() => SymbolDto)
  symbols: SymbolDto[];

  @Expose()
  @ApiProperty()
  @Type(() => UserDto)
  user: UserDto;
}
