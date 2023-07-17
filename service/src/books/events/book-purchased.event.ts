import { IsNumber } from 'class-validator';

export class BookPurchasedEvent {
  @IsNumber()
  bookId: number;

  @IsNumber()
  userId: number;
}
