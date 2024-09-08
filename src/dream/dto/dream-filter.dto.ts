import { IsOptional } from 'class-validator';
import { FilterDto } from '../../common/dto/filter.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class DreamFilterDto extends FilterDto {
  @ApiPropertyOptional()
  @IsOptional()
  mood?: string;

  @ApiPropertyOptional()
  @IsOptional()
  category?: string;
}
