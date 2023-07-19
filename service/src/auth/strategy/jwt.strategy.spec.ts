import { Test, TestingModule } from '@nestjs/testing';
import { JwtStrategy } from './jwt.strategy';
import { ConfigService } from '@nestjs/config';
import { Role } from '../enum/role.enum';

describe('JwtStrategy', () => {
  let strategy: JwtStrategy;
  let config: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtStrategy,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              return key === 'JWT_SECRET' ? 'secret' : null;
            }),
          },
        },
      ],
    }).compile();

    strategy = module.get<JwtStrategy>(JwtStrategy);
    config = module.get<ConfigService>(ConfigService);
  });

  describe('validate', () => {
    it('should return user payload if credentials are provided ', async () => {
      expect(config.get('JWT_SECRET')).toBe('secret');

      expect(
        await strategy.validate({
          sub: 1,
          email: 'admin@bookstore.com',
          roles: [Role.ADMIN, Role.USER],
        }),
      ).toEqual({
        id: 1,
        email: 'admin@bookstore.com',
        roles: [Role.ADMIN, Role.USER],
      });
    });
  });
});
