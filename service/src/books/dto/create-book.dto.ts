import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  author: string;

  @IsNotEmpty()
  isbn: string;

  @IsNumber()
  price: number;

  @IsNumber()
  quantity: number;
}
