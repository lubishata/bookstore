import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { BadRequestException } from '@nestjs/common';

describe('UserController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            createUser: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create user with hashed password', async () => {
      jest.spyOn(bcrypt, 'hash').mockImplementation(() => 'hashed123456');

      jest.spyOn(service, 'createUser').mockResolvedValue({
        id: 1,
        email: 'user@bookstore.com',
        password: 'hashed123456',
        roles: [
          {
            id: 1,
            name: 'USER',
          },
        ],
      });

      expect(
        await controller.create({
          email: 'user@bookstore.com',
          password: '123456',
        }),
      ).toEqual({
        id: 1,
        email: 'user@bookstore.com',
        password: 'hashed123456',
        roles: [
          {
            id: 1,
            name: 'USER',
          },
        ],
      });

      expect(service.createUser).toHaveBeenCalledWith({
        email: 'user@bookstore.com',
        password: 'hashed123456',
      });

      expect(bcrypt.hash).toHaveBeenCalledWith('123456', expect.any(String));
    });

    it('should throw BadRequestException on createUser failure', async () => {
      jest.spyOn(bcrypt, 'hash').mockImplementation(() => 'hashed123456');
      jest
        .spyOn(service, 'createUser')
        .mockImplementation(() => Promise.reject());

      await expect(
        controller.create({
          email: 'user@bookstore.com',
          password: '123456',
        }),
      ).rejects.toThrowError(BadRequestException);

      expect(service.createUser).toHaveBeenCalledWith({
        email: 'user@bookstore.com',
        password: 'hashed123456',
      });

      expect(bcrypt.hash).toHaveBeenCalledWith('123456', expect.any(String));
    });
  });
});
