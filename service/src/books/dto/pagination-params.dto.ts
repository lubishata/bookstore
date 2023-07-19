import { IsNumber, IsOptional, IsString, Min, Max } from 'class-validator';

export class PaginationParamsDto {
  @IsNumber()
  @Min(1)
  page = 1;

  @IsNumber()
  @Min(1)
  @Max(100)
  limit = 10;

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  author?: string;

  @IsString()
  @IsOptional()
  isbn?: string;
}
