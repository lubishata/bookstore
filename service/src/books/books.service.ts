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

  create(createBookDto: CreateBookDto) {
    const book = this.bookRepository.create(createBookDto);
    return this.bookRepository.save(book);
  }

  findAll() {
    return this.bookRepository.find();
  }

  findOne(id: number) {
    return this.bookRepository.findOneBy({ id });
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    await this.bookRepository.update(id, updateBookDto);
    return this.bookRepository.findOneBy({ id });
  }

  async remove(id: number) {
    await this.bookRepository.delete(id);
    return id;
  }
}
