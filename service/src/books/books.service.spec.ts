import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BooksService } from './books.service';
import { Book } from './entities/book.entity';
import * as filter from './pagination/filter';
import { Repository } from 'typeorm';
import { ClientKafka } from '@nestjs/microservices';
import { createFilterWhereClause } from './pagination/filter';

describe('BooksService', () => {
  let service: BooksService;
  let bookRepository: Repository<Book>;
  let bookClient: ClientKafka;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getRepositoryToken(Book),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findAndCount: jest.fn(),
            findOneByOrFail: jest.fn(),
            remove: jest.fn(),
          },
        },
        {
          provide: 'BOOK_SERVICE',
          useValue: {
            emit: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
    bookRepository = module.get<Repository<Book>>(getRepositoryToken(Book));
    bookClient = module.get<ClientKafka>('BOOK_SERVICE');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new book entity and return it', async () => {
      const book = {
        title: '1984',
        author: 'George Orwell',
        isbn: '9780451524935',
        price: 7.48,
        quantity: 10,
      };

      jest.spyOn(bookRepository, 'create').mockReturnValue({
        id: 1,
        ...book,
      });

      jest.spyOn(bookRepository, 'save').mockResolvedValue({
        id: 1,
        ...book,
      });

      expect(await service.create(book)).toEqual({
        id: expect.any(Number),
        ...book,
      });

      expect(bookRepository.create).toHaveBeenCalledWith(book);
      expect(bookRepository.save).toHaveBeenCalledWith({
        id: 1,
        ...book,
      });
    });
  });

  describe('findAll', () => {
    it('should return array of books and total count', async () => {
      jest.spyOn(filter, 'createFilterWhereClause').mockReturnValue({});

      jest.spyOn(bookRepository, 'findAndCount').mockResolvedValue([
        [
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
        2,
      ]);

      expect(await service.findAll()).toEqual({
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

      expect(bookRepository.findAndCount).toHaveBeenCalledWith({
        skip: 0,
        take: 10,
        where: {},
      });

      expect(createFilterWhereClause).toHaveBeenCalledWith([]);
    });
  });

  describe('findOne', () => {
    it('should return a single book on success', async () => {
      jest.spyOn(bookRepository, 'findOneByOrFail').mockResolvedValue({
        id: 1,
        title: '1984',
        author: 'George Orwell',
        isbn: '9780451524935',
        price: 7.48,
        quantity: 10,
      });

      expect(await service.findOne(1)).toEqual({
        id: 1,
        title: '1984',
        author: 'George Orwell',
        isbn: '9780451524935',
        price: 7.48,
        quantity: 10,
      });

      expect(bookRepository.findOneByOrFail).toHaveBeenCalledWith({
        id: 1,
      });
    });

    it('should return rejected promise on failure', async () => {
      jest.spyOn(bookRepository, 'findOneByOrFail').mockRejectedValue('error');

      await expect(service.findOne(1)).rejects.toEqual('error');

      expect(bookRepository.findOneByOrFail).toHaveBeenCalledWith({
        id: 1,
      });
    });
  });

  describe('update', () => {
    it('should update a book and return it', async () => {
      const book = {
        id: 1,
        title: '1984',
        author: 'George Orwell',
        isbn: '9780451524935',
        price: 7.48,
        quantity: 10,
      };

      jest.spyOn(bookRepository, 'findOneByOrFail').mockResolvedValue(book);

      jest.spyOn(bookRepository, 'save').mockResolvedValue({
        ...book,
        quantity: 15,
      });

      expect(await service.update(book.id, { quantity: 15 })).toEqual({
        ...book,
        quantity: 15,
      });

      expect(bookRepository.save).toHaveBeenCalledWith({
        ...book,
        quantity: 15,
      });

      expect(bookRepository.findOneByOrFail).toHaveBeenCalledWith({
        id: book.id,
      });
    });
  });

  describe('remove', () => {
    it('should remove a book and return it', async () => {
      const book = {
        id: 1,
        title: '1984',
        author: 'George Orwell',
        isbn: '9780451524935',
        price: 7.48,
        quantity: 10,
      };

      jest.spyOn(bookRepository, 'findOneByOrFail').mockResolvedValue(book);
      jest.spyOn(bookRepository, 'remove').mockResolvedValue(book);

      expect(await service.remove(book.id)).toEqual(book);
      expect(bookRepository.remove).toHaveBeenCalledWith(book);

      expect(bookRepository.findOneByOrFail).toHaveBeenCalledWith({
        id: book.id,
      });
    });
  });

  describe('purchase', () => {
    it('should update book quantity and emit event through Kafka', async () => {
      const book = {
        id: 1,
        title: '1984',
        author: 'George Orwell',
        isbn: '9780451524935',
        price: 7.48,
        quantity: 10,
      };

      jest.spyOn(bookRepository, 'findOneByOrFail').mockResolvedValue(book);

      jest.spyOn(bookRepository, 'save').mockResolvedValue({
        ...book,
        quantity: book.quantity - 1,
      });

      expect(await service.purchase(book.id, 1)).toEqual({
        ...book,
        quantity: book.quantity - 1,
      });

      expect(bookRepository.save).toHaveBeenCalledWith({
        ...book,
        quantity: book.quantity - 1,
      });

      expect(bookRepository.findOneByOrFail).toHaveBeenCalledWith({
        id: book.id,
      });

      expect(bookClient.emit).toHaveBeenCalledWith('book_purchased', {
        bookId: book.id,
        userId: 1,
      });
    });
  });
});
