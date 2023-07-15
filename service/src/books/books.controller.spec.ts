import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { NotFoundException } from '@nestjs/common';

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

const mockBooksService = {
  create: jest.fn((dto: CreateBookDto) =>
    Promise.resolve({
      id: Date.now(),
      ...dto,
    }),
  ),
  findAll: jest.fn(() => Promise.resolve(books)),
  findOne: jest.fn((id: number) =>
    id === 3
      ? Promise.reject()
      : Promise.resolve({
          id,
          title: '1984',
          author: 'George Orwell',
          isbn: '9780451524935',
          price: 7.48,
          quantity: 10,
        }),
  ),
  update: jest.fn((id: number, dto: UpdateBookDto) =>
    id === 3
      ? Promise.reject()
      : Promise.resolve({
          id,
          ...dto,
        }),
  ),
  remove: jest.fn((id: number) =>
    id === 3
      ? Promise.reject()
      : Promise.resolve({
          id,
          title: '1984',
          author: 'George Orwell',
          isbn: '9780451524935',
          price: 7.48,
          quantity: 10,
        }),
  ),
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
      expect(await controller.create(createBookDto)).toEqual({
        id: expect.any(Number),
        ...createBookDto,
      });
      expect(mockBooksService.create).toHaveBeenCalledWith(createBookDto);
    });
  });

  describe('findAll', () => {
    it('should return list of books', async () => {
      expect(await controller.findAll()).toEqual(books);
      expect(mockBooksService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single book', async () => {
      expect(await controller.findOne('1')).toEqual(books[0]);
      expect(mockBooksService.findOne).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException on non-existent id', async () => {
      await expect(controller.findOne('3')).rejects.toThrowError(
        NotFoundException,
      );
      expect(mockBooksService.findOne).toHaveBeenCalledWith(3);
    });
  });

  describe('update', () => {
    it('should update a book', async () => {
      expect(await controller.update('1', updateBookDto)).toEqual({
        id: 1,
        ...updateBookDto,
      });
      expect(mockBooksService.update).toHaveBeenCalledWith(1, updateBookDto);
    });

    it('should throw NotFoundException on non-existent id', async () => {
      await expect(controller.update('3', updateBookDto)).rejects.toThrowError(
        NotFoundException,
      );
      expect(mockBooksService.update).toHaveBeenCalledWith(3, updateBookDto);
    });
  });

  describe('remove', () => {
    it('should remove a book', async () => {
      expect(await controller.remove('1')).toEqual(books[0]);
      expect(mockBooksService.remove).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException on non-existent id', async () => {
      await expect(controller.remove('3')).rejects.toThrowError(
        NotFoundException,
      );
      expect(mockBooksService.remove).toHaveBeenCalledWith(3);
    });
  });
});
