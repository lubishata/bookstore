import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class PaginationParamsDto {
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page = 1;

  @Type(() => Number)
  @IsNumber()
  @Min(1)
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
