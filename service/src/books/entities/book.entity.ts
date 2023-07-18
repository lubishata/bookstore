import { Entity, Check, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@Check(`"price" > 0`)
@Check(`"quantity" >= 0`)
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  author: string;

  @Column({ nullable: false, unique: true })
  isbn: string;

  @Column({ nullable: false, type: 'decimal', precision: 5, scale: 2 })
  price: number;

  @Column({ nullable: false })
  quantity: number;
}
