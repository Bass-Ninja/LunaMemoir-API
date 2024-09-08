// paginated-response.dto.ts
import { Expose } from 'class-transformer';

export class PaginatedResponseDto<T> {
  @Expose()
  data: T[];

  @Expose()
  totalItems: number;

  @Expose()
  totalPages: number;

  @Expose()
  currentPage: number;

  @Expose()
  pageSize: number;

  @Expose()
  hasPreviousPage: boolean;

  @Expose()
  hasNextPage: boolean;

  constructor(
    data: T[],
    totalItems: number,
    currentPage: number,
    pageSize: number,
  ) {
    this.data = data;
    this.totalItems = totalItems;
    this.totalPages = Math.ceil(totalItems / pageSize);
    this.currentPage = currentPage;
    this.pageSize = pageSize;
    this.hasNextPage = this.currentPage < this.totalPages;
    this.hasPreviousPage = currentPage > 1;
  }
}
