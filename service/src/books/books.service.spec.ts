import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { BooksService } from './books.service';
import { Book } from './entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

const mockBookRepository = {
  create: jest.fn((dto: CreateBookDto) => plainToInstance(Book, dto)),
  save: jest.fn((book: Book) => Promise.resolve(book)),
  find: jest.fn(() =>
    Promise.resolve([
      {
        title: '1984',
        author: 'George Orwell',
        isbn: '9780451524935',
        price: 7.48,
        quantity: 10,
      },
      {
        title: 'Animal Farm',
        author: 'George Orwell',
        isbn: '9788129116123',
        price: 6.99,
        quantity: 15,
      },
    ]),
  ),
  findOneBy: jest.fn(({ id }: { id: number }) =>
    Promise.resolve(
      plainToInstance(Book, {
        id,
        title: '1984',
        author: 'George Orwell',
        isbn: '9780451524935',
        price: 7.48,
        quantity: 10,
      }),
    ),
  ),
  update: jest.fn((id: number, dto: UpdateBookDto) =>
    Promise.resolve(
      plainToInstance(Book, {
        id,
        title: '1984',
        author: 'George Orwell',
        isbn: '9780451524935',
        ...dto,
      }),
    ),
  ),
  delete: jest.fn().mockResolvedValue(true),
};

describe('BooksService', () => {
  let service: BooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        { provide: getRepositoryToken(Book), useValue: mockBookRepository },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new book entity and return it', async () => {
      const createBookDto = {
        title: '1984',
        author: 'George Orwell',
        isbn: '9780451524935',
        price: 7.48,
        quantity: 10,
      };

      const book = plainToInstance(Book, createBookDto);

      expect(await service.create(createBookDto)).toEqual(book);

      expect(mockBookRepository.create).toHaveBeenCalledWith(createBookDto);
      expect(mockBookRepository.save).toHaveBeenCalledWith(book);
    });
  });

  describe('findAll', () => {
    it('should return array of books', async () => {
      expect(await service.findAll()).toEqual([
        {
          title: '1984',
          author: 'George Orwell',
          isbn: '9780451524935',
          price: 7.48,
          quantity: 10,
        },
        {
          title: 'Animal Farm',
          author: 'George Orwell',
          isbn: '9788129116123',
          price: 6.99,
          quantity: 15,
        },
      ]);

      expect(mockBookRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single book', async () => {
      expect(await service.findOne(1)).toEqual({
        id: 1,
        title: '1984',
        author: 'George Orwell',
        isbn: '9780451524935',
        price: 7.48,
        quantity: 10,
      });

      expect(mockBookRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
    });
  });

  describe('update', () => {
    it('should update a book and return it', async () => {
      const updateBookDto = {
        price: 11.29,
        quantity: 15,
      };

      // service.update uses findOneBy internally
      // result won't have any changes due to mock implementation of findOneBy
      expect(await service.update(1, updateBookDto)).toEqual({
        id: 1,
        title: '1984',
        author: 'George Orwell',
        isbn: '9780451524935',
        price: 7.48,
        quantity: 10,
      });

      expect(mockBookRepository.update).toHaveBeenCalledWith(1, updateBookDto);
      expect(mockBookRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
    });
  });

  describe('remove', () => {
    it('should remove a book', async () => {
      expect(await service.remove(1)).toEqual(1);
      expect(mockBookRepository.delete).toHaveBeenCalledWith(1);
    });
  });
});
