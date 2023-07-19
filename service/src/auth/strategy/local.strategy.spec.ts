import * as bcrypt from 'bcrypt';
import { Test, TestingModule } from '@nestjs/testing';
import { LocalStrategy } from './local.strategy';
import { AuthService } from '../auth.service';
import { UnauthorizedException } from '@nestjs/common';

describe('LocalStrategy', () => {
  let strategy: LocalStrategy;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LocalStrategy,
        {
          provide: AuthService,
          useValue: {
            constructor: jest.fn(),
            login: jest.fn(),
            validateUser: jest.fn(),
          },
        },
      ],
    }).compile();

    strategy = module.get<LocalStrategy>(LocalStrategy);
    authService = module.get<AuthService>(AuthService);
  });

  describe('validate', () => {
    it('should return user payload if credentials are provided ', async () => {
      const hash = await bcrypt.hash('123456', 10);

      jest.spyOn(authService, 'validateUser').mockResolvedValue({
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

      expect(await strategy.validate('admin@bookstore.com', '123456')).toEqual({
        id: 1,
        email: 'admin@bookstore.com',
        roles: ['ADMIN', 'USER'],
      });

      expect(authService.validateUser).toHaveBeenCalledWith(
        'admin@bookstore.com',
        '123456',
      );
    });

    it('should throw UnauthorizedException is credentials are invalid', async () => {
      jest.spyOn(authService, 'validateUser').mockResolvedValue(null);

      expect(
        strategy.validate('admin@bookstore.com', '123456'),
      ).rejects.toThrowError(UnauthorizedException);

      expect(authService.validateUser).toHaveBeenCalledWith(
        'admin@bookstore.com',
        '123456',
      );
    });
  });
});
