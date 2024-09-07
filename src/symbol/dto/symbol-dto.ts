import { Expose } from 'class-transformer';

export class SymbolDto {
  @Expose() id?: string;
  @Expose() name: string;
}
