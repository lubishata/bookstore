import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { SSEService } from '../sse/sse.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { EntityNotFoundError } from 'typeorm';
import { Book } from './entities/book.entity';
import { lastValueFrom, of } from 'rxjs';

describe('BooksController', () => {
  let controller: BooksController;
  let booksService: BooksService;
  let sseService: SSEService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        {
          provide: BooksService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
            purchase: jest.fn(),
          },
        },
        {
          provide: SSEService,
          useValue: {
            pushEvent: jest.fn(),
            sse: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<BooksController>(BooksController);
    booksService = module.get<BooksService>(BooksService);
    sseService = module.get<SSEService>(SSEService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('sse', () => {
    it('should send server-sent event', async () => {
      jest.spyOn(sseService, 'sse').mockImplementation(() => {
        return of({ data: { bookId: 1, userId: 1 } } as MessageEvent);
      });

      expect(await lastValueFrom(controller.sse())).toBeTruthy();
      expect(sseService.sse).toBeCalled();
    });
  });

  describe('create', () => {
    it('should create a book on success', async () => {
      const book = {
        title: '1984',
        author: 'George Orwell',
        isbn: '9780451524935',
        price: 7.48,
        quantity: 10,
      };

      jest.spyOn(booksService, 'create').mockResolvedValue({
        id: 1,
        ...book,
      });

      expect(await controller.create(book)).toEqual({
        id: 1,
        ...book,
      });

      expect(booksService.create).toHaveBeenCalledWith(book);
    });

    it('should throw BadRequestException on failure', async () => {
      jest.spyOn(booksService, 'create').mockRejectedValue({});

      await expect(
        controller.create({
          title: '1984',
          author: 'George Orwell',
          isbn: '9780451524935',
          price: 7.48,
          quantity: 10,
        }),
      ).rejects.toThrowError(BadRequestException);

      expect(booksService.create).toHaveBeenCalledWith({
        title: '1984',
        author: 'George Orwell',
        isbn: '9780451524935',
        price: 7.48,
        quantity: 10,
      });
    });
  });

  describe('findAll', () => {
    it('should return paginated response with array of books', async () => {
      jest.spyOn(booksService, 'findAll').mockResolvedValue({
        data: [
          {
            id: 1,
            title: '1984',
            author: 'George Orwell',
            isbn: '9780451524935',
            price: 7.48,
            quantity: 10,
          },
          {
            id: 2,
            title: 'Animal Farm',
            author: 'George Orwell',
            isbn: '9788129116123',
            price: 6.99,
            quantity: 15,
          },
        ],
        total: 2,
      });

      expect(await controller.findAll({ page: 1, limit: 10 })).toEqual({
        data: [
          {
            id: 1,
            title: '1984',
            author: 'George Orwell',
            isbn: '9780451524935',
            price: 7.48,
            quantity: 10,
          },
          {
            id: 2,
            title: 'Animal Farm',
            author: 'George Orwell',
            isbn: '9788129116123',
            price: 6.99,
            quantity: 15,
          },
        ],
        meta: {
          itemCount: 2,
          totalItems: 2,
          itemsPerPage: 10,
          totalPages: 1,
          currentPage: 1,
        },
        links: {
          first: `/books?limit=10`,
          last: `/books?page=1&limit=10`,
        },
      });

      expect(booksService.findAll).toHaveBeenCalledWith(
        [
          { property: 'title', value: undefined },
          { property: 'author', value: undefined },
          { property: 'isbn', value: undefined },
        ],
        10,
        0,
      );
    });
  });

  describe('findOne', () => {
    it('should return a single book on success', async () => {
      jest.spyOn(booksService, 'findOne').mockResolvedValue({
        id: 1,
        title: '1984',
        author: 'George Orwell',
        isbn: '9780451524935',
        price: 7.48,
        quantity: 10,
      });

      expect(await controller.findOne(1)).toEqual({
        id: 1,
        title: '1984',
        author: 'George Orwell',
        isbn: '9780451524935',
        price: 7.48,
        quantity: 10,
      });

      expect(booksService.findOne).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException on non-existing book', async () => {
      jest.spyOn(booksService, 'findOne').mockRejectedValue({});

      await expect(controller.findOne(1)).rejects.toThrowError(
        NotFoundException,
      );

      expect(booksService.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should update a book on success', async () => {
      jest.spyOn(booksService, 'update').mockResolvedValue({
        id: 1,
        title: '1984',
        author: 'George Orwell',
        isbn: '9780451524935',
        price: 7.48,
        quantity: 15,
      });

      expect(await controller.update(1, { quantity: 15 })).toEqual({
        id: 1,
        title: '1984',
        author: 'George Orwell',
        isbn: '9780451524935',
        price: 7.48,
        quantity: 15,
      });

      expect(booksService.update).toHaveBeenCalledWith(1, { quantity: 15 });
    });

    it('should throw NotFoundException on non-existing book', async () => {
      jest.spyOn(booksService, 'update').mockRejectedValue({});

      await expect(controller.update(1, { quantity: 15 })).rejects.toThrowError(
        NotFoundException,
      );

      expect(booksService.update).toHaveBeenCalledWith(1, { quantity: 15 });
    });
  });

  describe('remove', () => {
    it('should remove a book on success', async () => {
      jest.spyOn(booksService, 'remove').mockResolvedValue({
        id: 1,
        title: '1984',
        author: 'George Orwell',
        isbn: '9780451524935',
        price: 7.48,
        quantity: 10,
      });

      expect(await controller.remove(1)).toEqual({
        id: 1,
        title: '1984',
        author: 'George Orwell',
        isbn: '9780451524935',
        price: 7.48,
        quantity: 10,
      });

      expect(booksService.remove).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException on non-existing book', async () => {
      jest.spyOn(booksService, 'remove').mockRejectedValue({});

      await expect(controller.remove(1)).rejects.toThrowError(
        NotFoundException,
      );

      expect(booksService.remove).toHaveBeenCalledWith(1);
    });
  });

  describe('purchase', () => {
    it('should reduce book quantity on success', async () => {
      jest.spyOn(booksService, 'purchase').mockResolvedValue({
        id: 1,
        title: '1984',
        author: 'George Orwell',
        isbn: '9780451524935',
        price: 7.48,
        quantity: 9,
      });

      expect(await controller.purchase(1)).toEqual({
        id: 1,
        title: '1984',
        author: 'George Orwell',
        isbn: '9780451524935',
        price: 7.48,
        quantity: 9,
      });

      expect(booksService.purchase).toHaveBeenCalledWith(1, expect.any(Number));
    });

    it('should throw NotFoundException on non-existing book', async () => {
      jest
        .spyOn(booksService, 'purchase')
        .mockRejectedValue(new EntityNotFoundError(Book, null));

      await expect(controller.purchase(1)).rejects.toThrowError(
        NotFoundException,
      );

      expect(booksService.purchase).toHaveBeenCalledWith(1, expect.any(Number));
    });

    it('should throw BadRequestException on insufficient quantity', async () => {
      jest.spyOn(booksService, 'purchase').mockRejectedValue({});

      await expect(controller.purchase(1)).rejects.toThrowError(
        BadRequestException,
      );

      expect(booksService.purchase).toHaveBeenCalledWith(1, expect.any(Number));
    });
  });

  describe('handleBookPurchased', () => {
    it('should handle book purchase event received from Kafka', async () => {
      jest.spyOn(sseService, 'pushEvent').mockReturnValue();

      controller.handleBookPurchased({ bookId: 1, userId: 1 });

      expect(sseService.pushEvent).toHaveBeenCalledWith({
        data: { bookId: 1, userId: 1 },
      } as MessageEvent);
    });
  });
});
