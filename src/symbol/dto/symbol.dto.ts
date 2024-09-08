import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class SymbolDto {
  @Expose()
  @IsOptional()
  @ApiProperty()
  id?: string;

  @Expose()
  @IsNotEmpty()
  @ApiProperty()
  name: string;
}
