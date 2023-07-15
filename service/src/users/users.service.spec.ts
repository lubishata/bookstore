import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';

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

const mockUserRepository = {
  create: jest.fn((dto: UserDto) => plainToInstance(User, dto)),
  save: jest.fn((user: User) => Promise.resolve(user)),
  find: jest.fn(() => Promise.resolve(users)),
  findOneOrFail: jest.fn().mockResolvedValue(plainToInstance(User, {
    id: Date.now(),
    email: 'john.dole@example.com',
    password: 'exampleP@ssw0rd!',
    role: 1,
  })),
  remove: jest.fn((user: User) => Promise.resolve(user)),
};

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getRepositoryToken(User), useValue: mockUserRepository },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user entity and return it', async () => {
      const user = plainToInstance(User, userDto);

      expect(await service.create(userDto)).toEqual(user);
      expect(mockUserRepository.create).toHaveBeenCalledWith(userDto);
      expect(mockUserRepository.save).toHaveBeenCalledWith(user);
    });
  });

  describe('findAll', () => {
    it('should return array of users', async () => {
      expect(await service.findAll()).toEqual(users);
      expect(mockUserRepository.find).toHaveBeenCalled();
    });
  });

  describe('findById', () => {
    it('should return a single user', async () => {
      expect(await service.findById(1)).toEqual(users[0]);
      expect(mockUserRepository.findOneOrFail).toHaveBeenCalledWith({
        id: 1,
      });
    });
  });

  describe('findByEmail', () => {
    it('should return a single user', async () => {
      expect(await service.findByEmail('john.dole@example.com')).toEqual(users[0]);
      expect(mockUserRepository.findOneOrFail).toHaveBeenCalledWith({
        id: 1,
      });
    });
  });

  describe('update', () => {
    it('should update a user and return it', async () => {
      const user = plainToInstance(User, {
        ...users[0],
        ...userDto,
      });

      expect(await service.update(1, userDto)).toEqual(user);
      expect(mockUserRepository.save).toHaveBeenCalledWith(user);
      expect(mockUserRepository.findOneOrFail).toHaveBeenCalledWith({
        id: 1,
      });
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      const user = plainToInstance(User, users[0]);

      expect(await service.remove(1)).toEqual(user);
      expect(mockUserRepository.remove).toHaveBeenCalledWith(user);
      expect(mockUserRepository.findOneOrFail).toHaveBeenCalledWith({
        id: 1,
      });
    });
  });
});
