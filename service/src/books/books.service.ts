import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { Filter } from './filter';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private bookRepository: Repository<Book>,
  ) {}

  create(createBookDto: CreateBookDto) {
    const book = this.bookRepository.create(createBookDto);
    return this.bookRepository.save(book);
  }

  async findAll(filters: Filter[], take = 10, skip = 0) {
    const where = filters
      .filter((filter) => filter.value)
      .map((filter) => ({ [filter.property]: ILike(`%${filter.value}%`) }))
      .reduce(
        (accumulator, current) => Object.assign(accumulator, current),
        {},
      );

    const [data, count] = await this.bookRepository.findAndCount({
      take,
      skip,
      where,
    });

    return { data, count };
  }

  findOne(id: number) {
    return this.bookRepository.findOneByOrFail({ id });
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    const book = await this.findOne(id);
    return this.bookRepository.save({
      ...book,
      ...updateBookDto,
    });
  }

  async remove(id: number) {
    const book = await this.findOne(id);
    return this.bookRepository.remove(book);
  }
}
