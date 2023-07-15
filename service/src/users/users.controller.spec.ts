import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';
import { NotFoundException } from '@nestjs/common';

const users = [
  {
    id: 1,
    email: 'john.dole@example.com',
    password: 'exampleP@ssw0rd!',
    role: 1,
  },
  {
    id: 2,
    email: 'john.dole@domain.com',
    password: 'exampleP@ssw0rd!',
    role: 0,
  }
]

const userDto = {
  email: 'john.dole@example.com',
  password: 'exampleP@ssw0rd!',
  role: 1,
};

const mockUsersService = {
  create: jest.fn((dto: UserDto) =>
    Promise.resolve({
      id: Date.now(),
      ...dto,
    }),
  ),
  findAll: jest.fn(() => Promise.resolve(users)),
  findOne: jest.fn((id: number) =>
    id === 3
      ? Promise.reject()
      : Promise.resolve({
        id: 1,
        email: 'john.dole@example.com',
        password: 'exampleP@ssw0rd!',
        role: 1,
        }),
  ),
  update: jest.fn((id: number, dto: UserDto) =>
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
          email: 'john.dole@example.com',
          password: 'exampleP@ssw0rd!',
          role: 1,
        }),
  ),
};

describe('UserController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService]
    }).overrideProvider(UsersService)
    .useValue(mockUsersService)
    .compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      expect(await controller.create(userDto)).toEqual({
        id: expect.any(Number),
        ...userDto,
      });
      expect(mockUsersService.create).toHaveBeenCalledWith(userDto);
    });
  });

  describe('findAll', () => {
    it('should return list of users', async () => {
      expect(await controller.findAll()).toEqual(users);
      expect(mockUsersService.findAll).toHaveBeenCalled();
    });
  });

  describe('findById', () => {
    it('should return a single user', async () => {
      expect(await controller.findById(1)).toEqual(users[0]);
      expect(mockUsersService.findOne).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException on non-existent id', async () => {
      await expect(controller.findById(3)).rejects.toThrowError(
        NotFoundException,
      );
      expect(mockUsersService.findOne).toHaveBeenCalledWith(3);
    });
  });

  describe('findByEmail', () => {
    it('should return a single user', async () => {
      expect(await controller.findByEmail('john.dole@example.com')).toEqual(users[0]);
      expect(mockUsersService.findOne).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException on non-existent id', async () => {
      await expect(controller.findByEmail("john.dole@nowhere.com")).rejects.toThrowError(
        NotFoundException,
      );
      expect(mockUsersService.findOne).toHaveBeenCalledWith(3);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      expect(await controller.update(1, userDto)).toEqual({
        id: 1,
        ...userDto,
      });
      expect(mockUsersService.update).toHaveBeenCalledWith(1, userDto);
    });

    it('should throw NotFoundException on non-existent id', async () => {
      await expect(controller.update(3, userDto)).rejects.toThrowError(
        NotFoundException,
      );
      expect(mockUsersService.update).toHaveBeenCalledWith(3, userDto);
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      expect(await controller.remove(1)).toEqual(users[0]);
      expect(mockUsersService.remove).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException on non-existent id', async () => {
      await expect(controller.remove(3)).rejects.toThrowError(
        NotFoundException,
      );
      expect(mockUsersService.remove).toHaveBeenCalledWith(3);
    });
  });
});