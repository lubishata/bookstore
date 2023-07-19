import * as bcrypt from 'bcrypt';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { Role } from './enum/role.enum';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            constructor: jest.fn(),
            findOneByEmail: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            constructor: jest.fn(),
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('should return user if credentials are correct', async () => {
      const hash = await bcrypt.hash('123456', 10);

      jest.spyOn(usersService, 'findOneByEmail').mockResolvedValue({
        id: 1,
        email: 'admin@bookstore.com',
        password: hash,
        roles: [
          {
            id: 1,
            name: 'ADMIN',
          },
          {
            id: 2,
            name: 'USER',
          },
        ],
      } as User);

      expect(
        await service.validateUser('admin@bookstore.com', '123456'),
      ).toEqual({
        id: 1,
        email: 'admin@bookstore.com',
        password: hash,
        roles: [
          {
            id: 1,
            name: 'ADMIN',
          },
          {
            id: 2,
            name: 'USER',
          },
        ],
      });

      expect(usersService.findOneByEmail).toBeCalledTimes(1);
      expect(usersService.findOneByEmail).toBeCalledWith('admin@bookstore.com');
    });

    it('should return null if credentials are incorrect', async () => {
      const hash = await bcrypt.hash('123456', 10);

      jest.spyOn(usersService, 'findOneByEmail').mockResolvedValue({
        id: 1,
        email: 'admin@bookstore.com',
        password: hash,
        roles: [
          {
            id: 1,
            name: 'ADMIN',
          },
          {
            id: 2,
            name: 'USER',
          },
        ],
      } as User);

      expect(
        await service.validateUser('admin@bookstore.com', '123457'),
      ).toEqual(null);

      expect(usersService.findOneByEmail).toBeCalledTimes(1);
      expect(usersService.findOneByEmail).toBeCalledWith('admin@bookstore.com');
    });

    it('should return null if user is not found', async () => {
      jest.spyOn(usersService, 'findOneByEmail').mockResolvedValue(null);

      expect(
        await service.validateUser('admin@bookstore.com', '123456'),
      ).toEqual(null);

      expect(usersService.findOneByEmail).toBeCalledTimes(1);
      expect(usersService.findOneByEmail).toBeCalledWith('admin@bookstore.com');
    });
  });

  describe('login', () => {
    it('should return signed jwt token', async () => {
      jest.spyOn(jwtService, 'sign').mockReturnValue('token');

      expect(
        await service.login({
          id: 1,
          email: 'admin@bookstore.com',
          roles: [Role.ADMIN, Role.USER],
        }),
      ).toEqual({ access_token: 'token' });

      expect(jwtService.sign).toBeCalledTimes(1);
      expect(jwtService.sign).toBeCalledWith({
        email: 'admin@bookstore.com',
        sub: 1,
        roles: [Role.ADMIN, Role.USER],
      });
    });
  });
});
