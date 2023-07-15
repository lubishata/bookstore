import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

const mockBooksService = {
  create: jest.fn((dto: CreateBookDto) => ({
    id: Date.now(),
    ...dto,
  })),
  findAll: jest.fn(() => [
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
  findOne: jest.fn((id: number) => ({
    id,
    title: '1984',
    author: 'George Orwell',
    isbn: '9780451524935',
    price: 7.48,
    quantity: 10,
  })),
  update: jest.fn((id: number, dto: UpdateBookDto) => ({
    id,
    ...dto,
  })),
  remove: jest.fn((id: number) => id),
};

describe('BooksController', () => {
  let controller: BooksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [BooksService],
    })
      .overrideProvider(BooksService)
      .useValue(mockBooksService)
      .compile();

    controller = module.get<BooksController>(BooksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a book', async () => {
      const createBookDto = {
        title: '1984',
        author: 'George Orwell',
        isbn: '9780451524935',
        price: 7.48,
        quantity: 10,
      };

      expect(controller.create(createBookDto)).toEqual({
        id: expect.any(Number),
        ...createBookDto,
      });

      expect(mockBooksService.create).toHaveBeenCalledWith(createBookDto);
    });
  });

  describe('findAll', () => {
    it('should return list of books', async () => {
      expect(controller.findAll()).toEqual([
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

      expect(mockBooksService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single book', async () => {
      expect(controller.findOne('1')).toEqual({
        id: 1,
        title: '1984',
        author: 'George Orwell',
        isbn: '9780451524935',
        price: 7.48,
        quantity: 10,
      });

      expect(mockBooksService.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should update a book', async () => {
      const updateBookDto = {
        price: 11.29,
        quantity: 15,
      };

      expect(controller.update('1', updateBookDto)).toEqual({
        id: 1,
        ...updateBookDto,
      });

      expect(mockBooksService.update).toHaveBeenCalledWith(1, updateBookDto);
    });
  });

  describe('remove', () => {
    it('should remove a book', async () => {
      expect(controller.remove('1')).toEqual(1);
      expect(mockBooksService.remove).toHaveBeenCalledWith(1);
    });
  });
});
