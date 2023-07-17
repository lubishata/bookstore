import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { Filter, createFilterWhereClause } from './pagination/filter';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private bookRepository: Repository<Book>,
    @Inject('ORDER_SERVICE') private readonly orderClient: ClientKafka,
  ) {}

  create(createBookDto: CreateBookDto) {
    const book = this.bookRepository.create(createBookDto);
    return this.bookRepository.save(book);
  }

  async findAll(filters: Filter[] = [], take = 10, skip = 0) {
    const where = createFilterWhereClause(filters);

    const [data, total] = await this.bookRepository.findAndCount({
      take,
      skip,
      where,
    });

    this.orderClient.emit('order_created', 1);

    return { data, total };
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
