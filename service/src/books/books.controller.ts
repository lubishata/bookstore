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
import { Filter } from './filter';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Get()
  findAll(@Query() query: PaginationParamsDto) {
    const filters = [
      new Filter('title', query.title),
      new Filter('author', query.author),
      new Filter('isbn', query.isbn),
    ];

    return this.booksService.findAll(
      filters,
      query.limit,
      query.limit * (query.page - 1),
    );
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
