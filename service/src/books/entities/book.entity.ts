import { Entity, Check, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@Check(`"quantity" >= 0`)
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  isbn: string;

  @Column({ unsigned: true, type: 'decimal', precision: 5, scale: 2 })
  price: number;

  @Column({ unsigned: true })
  quantity: number;
}
