import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { Filter, createFilterWhereClause } from './pagination/filter';
import { EntityList } from './interface/entity-list.interface';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private bookRepository: Repository<Book>,
    @Inject('BOOK_SERVICE') private readonly bookClient: ClientKafka,
  ) {}

  create(createBookDto: CreateBookDto) {
    const book = this.bookRepository.create(createBookDto);
    return this.bookRepository.save(book);
  }

  async findAll(
    filters: Filter[] = [],
    take = 10,
    skip = 0,
  ): Promise<EntityList<Book>> {
    const where = createFilterWhereClause(filters);

    const [data, total] = await this.bookRepository.findAndCount({
      take,
      skip,
      where,
    });

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

  async purchase(id: number, userId: number) {
    const book = await this.findOne(id);

    const updated = await this.bookRepository.save({
      ...book,
      quantity: book.quantity - 1,
    });

    this.bookClient.emit('book_purchased', { bookId: book.id, userId });

    return updated;
  }
}
