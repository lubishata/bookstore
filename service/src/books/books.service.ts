import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private bookRepository: Repository<Book>,
  ) {}

  create(createBookDto: CreateBookDto):Promise<Book> {
    const book = this.bookRepository.create(createBookDto);
    return this.bookRepository.save(book);
  }

  findAll():Promise<Book[]> {
    return this.bookRepository.find();
  }

  findOne(id: number):Promise<Book> {
    return this.bookRepository.findOneByOrFail({ id });
  }

  async update(id: number, updateBookDto: UpdateBookDto):Promise<Book> {
    const book = await this.findOne(id);
    return this.bookRepository.save({
      ...book,
      ...updateBookDto,
    });
  }

  async remove(id: number):Promise<Book> {
    const book = await this.findOne(id);
    return this.bookRepository.remove(book);
  }
}
