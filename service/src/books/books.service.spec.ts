import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { BooksService } from './books.service';
import { Book } from './entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { Filter } from './filter';

const filters: Filter[] = [
  { property: 'title', value: 'title' },
  { property: 'author', value: 'author' },
  { property: 'isbn', value: 'isbn' },
];

const books = [
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
];

const createBookDto = {
  title: '1984',
  author: 'George Orwell',
  isbn: '9780451524935',
  price: 7.48,
  quantity: 10,
};

const updateBookDto = {
  price: 11.29,
  quantity: 15,
};

const mockBookRepository = {
  create: jest.fn((dto: CreateBookDto) => plainToInstance(Book, dto)),
  save: jest.fn((book: Book) => Promise.resolve(book)),
  findAndCount: jest.fn(() => Promise.resolve([books, books.length])),
  findOneByOrFail: jest.fn(({ id }: { id: number }) =>
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
  remove: jest.fn((book: Book) => Promise.resolve(book)),
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
      const book = plainToInstance(Book, createBookDto);

      expect(await service.create(createBookDto)).toEqual(book);
      expect(mockBookRepository.create).toHaveBeenCalledWith(createBookDto);
      expect(mockBookRepository.save).toHaveBeenCalledWith(book);
    });
  });

  describe('findAll', () => {
    it('should return array of books', async () => {
      expect(await service.findAll(filters)).toEqual({
        data: books,
        count: books.length,
      });
      expect(mockBookRepository.findAndCount).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single book', async () => {
      expect(await service.findOne(1)).toEqual(books[0]);
      expect(mockBookRepository.findOneByOrFail).toHaveBeenCalledWith({
        id: 1,
      });
    });
  });

  describe('update', () => {
    it('should update a book and return it', async () => {
      const book = plainToInstance(Book, {
        ...books[0],
        ...updateBookDto,
      });

      expect(await service.update(1, updateBookDto)).toEqual(book);
      expect(mockBookRepository.save).toHaveBeenCalledWith(book);
      expect(mockBookRepository.findOneByOrFail).toHaveBeenCalledWith({
        id: 1,
      });
    });
  });

  describe('remove', () => {
    it('should remove a book', async () => {
      const book = plainToInstance(Book, books[0]);

      expect(await service.remove(1)).toEqual(book);
      expect(mockBookRepository.remove).toHaveBeenCalledWith(book);
      expect(mockBookRepository.findOneByOrFail).toHaveBeenCalledWith({
        id: 1,
      });
    });
  });
});
