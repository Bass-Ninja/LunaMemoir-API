import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class DreamCategoryDto {
  @Expose()
  @IsOptional()
  @ApiProperty()
  id?: string;

  @Expose()
  @ApiProperty()
  name: string;
}
