import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from './pagination.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FilterDto extends PaginationDto {
  @IsOptional()
  @ApiPropertyOptional()
  @IsString()
  search: string;
}
