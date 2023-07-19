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
  ValidationPipe,
  BadRequestException,
  Sse,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { EntityNotFoundError } from 'typeorm';
import { Observable } from 'rxjs';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PaginationParamsDto } from './dto/pagination-params.dto';
import { Filter } from './pagination/filter';
import { createPaginationResponse } from './pagination/pagination';
import { BookPurchasedEvent } from './events/book-purchased.event';
import { SSEService } from '../sse/sse.service';
import { HasRoles } from '../auth/guard/has-roles.decorator';
import { Role } from '../auth/enum/role.enum';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { RolesGuard } from '../auth/guard/roles.guard';

@Controller('books')
export class BooksController {
  constructor(
    private readonly booksService: BooksService,
    private readonly sseService: SSEService,
  ) {}

  @Sse('sse')
  sse(): Observable<MessageEvent> {
    return this.sseService.sse();
  }

  @HasRoles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto).catch((err) => {
      console.log(err);
      throw new BadRequestException();
    });
  }

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.findOne(id).catch(() => {
      throw new NotFoundException();
    });
  }

  @HasRoles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    return this.booksService.update(id, updateBookDto).catch(() => {
      throw new NotFoundException();
    });
  }

  @HasRoles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.remove(id).catch(() => {
      throw new NotFoundException();
    });
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Post(':id/purchase')
  async purchase(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.purchase(id, 1).catch((err) => {
      if (err instanceof EntityNotFoundError) {
        throw new NotFoundException();
      } else {
        throw new BadRequestException();
      }
    });
  }

  @EventPattern('book_purchased')
  handleBookPurchased(@Payload(ValidationPipe) data: BookPurchasedEvent) {
    this.sseService.pushEvent({ data } as MessageEvent);
  }
}
