import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  NotFoundException,
  ParseIntPipe,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PaginationParamsDto } from './dto/pagination-params.dto';
import { Filter } from './pagination/filter';
import { createPaginationResponse } from './pagination/pagination';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Get()
  async findAll(@Query() query: PaginationParamsDto) {
    const filters: Filter[] = [
      { property: 'title', value: query.title },
      { property: 'author', value: query.author },
      { property: 'isbn', value: query.isbn },
    ];

    const { data, total } = await this.booksService.findAll(
      filters,
      query.limit,
      query.limit * (query.page - 1),
    );

    return createPaginationResponse(data, total, query.page, query.limit);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.findOne(id).catch(() => {
      throw new NotFoundException();
    });
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    return this.booksService.update(id, updateBookDto).catch(() => {
      throw new NotFoundException();
    });
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.remove(id).catch(() => {
      throw new NotFoundException();
    });
  }
}
