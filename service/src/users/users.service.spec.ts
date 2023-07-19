import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: Repository<User>;
  let roleRepository: Repository<Role>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Role),
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    roleRepository = module.get<Repository<Role>>(getRepositoryToken(Role));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create user and existing role', async () => {
      jest.spyOn(roleRepository, 'findOne').mockResolvedValue({
        id: 1,
        name: 'USER',
      });

      jest.spyOn(userRepository, 'create').mockReturnValue({
        id: 1,
        email: 'user@bookstore.com',
        password: '123456',
        roles: [],
      });

      jest.spyOn(userRepository, 'save').mockResolvedValue({
        id: 1,
        email: 'user@bookstore.com',
        password: '123456',
        roles: [
          {
            id: 1,
            name: 'USER',
          },
        ],
      });

      expect(
        await service.create(
          { email: 'user@bookstore.com', password: '123456' },
          'USER',
        ),
      ).toEqual({
        id: 1,
        email: 'user@bookstore.com',
        password: '123456',
        roles: [
          {
            id: 1,
            name: 'USER',
          },
        ],
      });

      expect(roleRepository.findOne).toHaveBeenCalledWith({
        where: { name: 'USER' },
      });

      expect(userRepository.create).toHaveBeenCalledWith({
        email: 'user@bookstore.com',
        password: '123456',
      });

      expect(userRepository.save).toHaveBeenCalledWith({
        id: 1,
        email: 'user@bookstore.com',
        password: '123456',
        roles: [
          {
            id: 1,
            name: 'USER',
          },
        ],
      });
    });

    it('should return null when called with non-existing role', async () => {
      jest.spyOn(roleRepository, 'findOne').mockResolvedValue(null);

      expect(
        await service.create(
          { email: 'user@bookstore.com', password: '123456' },
          'USER',
        ),
      ).toEqual(null);

      expect(roleRepository.findOne).toHaveBeenCalledWith({
        where: { name: 'USER' },
      });

      expect(userRepository.create).not.toHaveBeenCalled();
      expect(userRepository.save).not.toHaveBeenCalled();
    });
  });

  describe('createUser', () => {
    it('should create user with role User', async () => {
      jest.spyOn(roleRepository, 'findOne').mockResolvedValue({
        id: 1,
        name: 'USER',
      });

      jest.spyOn(userRepository, 'create').mockReturnValue({
        id: 1,
        email: 'user@bookstore.com',
        password: '123456',
        roles: [],
      });

      jest.spyOn(userRepository, 'save').mockResolvedValue({
        id: 1,
        email: 'user@bookstore.com',
        password: '123456',
        roles: [
          {
            id: 1,
            name: 'USER',
          },
        ],
      });

      expect(
        await service.createUser({
          email: 'user@bookstore.com',
          password: '123456',
        }),
      ).toEqual({
        id: 1,
        email: 'user@bookstore.com',
        password: '123456',
        roles: [
          {
            id: 1,
            name: 'USER',
          },
        ],
      });

      expect(roleRepository.findOne).toHaveBeenCalledWith({
        where: { name: 'USER' },
      });

      expect(userRepository.create).toHaveBeenCalledWith({
        email: 'user@bookstore.com',
        password: '123456',
      });

      expect(userRepository.save).toHaveBeenCalledWith({
        id: 1,
        email: 'user@bookstore.com',
        password: '123456',
        roles: [
          {
            id: 1,
            name: 'USER',
          },
        ],
      });
    });
  });

  describe('createAdmin', () => {
    it('should create user with role User', async () => {
      jest.spyOn(roleRepository, 'findOne').mockResolvedValue({
        id: 1,
        name: 'ADMIN',
      });

      jest.spyOn(userRepository, 'create').mockReturnValue({
        id: 1,
        email: 'admin@bookstore.com',
        password: '123456',
        roles: [],
      });

      jest.spyOn(userRepository, 'save').mockResolvedValue({
        id: 1,
        email: 'admin@bookstore.com',
        password: '123456',
        roles: [
          {
            id: 1,
            name: 'ADMIN',
          },
        ],
      });

      expect(
        await service.createAdmin({
          email: 'admin@bookstore.com',
          password: '123456',
        }),
      ).toEqual({
        id: 1,
        email: 'admin@bookstore.com',
        password: '123456',
        roles: [
          {
            id: 1,
            name: 'ADMIN',
          },
        ],
      });

      expect(roleRepository.findOne).toHaveBeenCalledWith({
        where: { name: 'ADMIN' },
      });

      expect(userRepository.create).toHaveBeenCalledWith({
        email: 'admin@bookstore.com',
        password: '123456',
      });

      expect(userRepository.save).toHaveBeenCalledWith({
        id: 1,
        email: 'admin@bookstore.com',
        password: '123456',
        roles: [
          {
            id: 1,
            name: 'ADMIN',
          },
        ],
      });
    });
  });

  describe('findOne', () => {
    it('should return user with roles', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue({
        id: 1,
        email: 'admin@bookstore.com',
        password: '123456',
        roles: [
          {
            id: 1,
            name: 'ADMIN',
          },
        ],
      });

      expect(await service.findOne(1)).toEqual({
        id: 1,
        email: 'admin@bookstore.com',
        password: '123456',
        roles: [
          {
            id: 1,
            name: 'ADMIN',
          },
        ],
      });

      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: {
          roles: true,
        },
      });
    });
  });

  describe('findOneByEmail', () => {
    it('should return user with roles', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue({
        id: 1,
        email: 'admin@bookstore.com',
        password: '123456',
        roles: [
          {
            id: 1,
            name: 'ADMIN',
          },
        ],
      });

      expect(await service.findOneByEmail('admin@bookstore.com')).toEqual({
        id: 1,
        email: 'admin@bookstore.com',
        password: '123456',
        roles: [
          {
            id: 1,
            name: 'ADMIN',
          },
        ],
      });

      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { email: 'admin@bookstore.com' },
        relations: {
          roles: true,
        },
      });
    });
  });
});
