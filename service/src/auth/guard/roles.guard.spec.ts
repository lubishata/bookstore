import { createMock } from '@golevelup/ts-jest';
import { Reflector } from '@nestjs/core';
import { ExecutionContext } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { RolesGuard } from './roles.guard';
import { Role } from '../enum/role.enum';
import { AuthRequest } from '../interface/auth-request.interface';

describe('RolesGuard', () => {
  let guard: RolesGuard;
  let reflector: Reflector;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RolesGuard,
        {
          provide: Reflector,
          useValue: {
            constructor: jest.fn(),
            getAllAndOverride: jest.fn(),
          },
        },
      ],
    }).compile();

    guard = module.get<RolesGuard>(RolesGuard);
    reflector = module.get<Reflector>(Reflector);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  it('should skip (return true) if the `HasRoles` decorator is not set', async () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue([]);

    const context = createMock<ExecutionContext>();

    expect(guard.canActivate(context)).toBeTruthy();
    expect(reflector.getAllAndOverride).toHaveBeenCalled();
  });

  it('should return true if the `HasRoles` decorator is set and role is allowed', async () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue([Role.USER]);

    const context = createMock<ExecutionContext>({
      getHandler: jest.fn(),
      switchToHttp: jest.fn().mockReturnValue({
        getRequest: jest.fn().mockReturnValue({
          user: { roles: [Role.USER] },
        } as AuthRequest),
      }),
    });

    expect(guard.canActivate(context)).toBeTruthy();
    expect(reflector.getAllAndOverride).toHaveBeenCalled();
  });

  it('should return false if the `HasRoles` decorator is set but role is not allowed', async () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue([Role.ADMIN]);

    const context = createMock<ExecutionContext>({
      getHandler: jest.fn(),
      switchToHttp: jest.fn().mockReturnValue({
        getRequest: jest.fn().mockReturnValue({
          user: { roles: [Role.USER] },
        } as AuthRequest),
      }),
    });

    expect(guard.canActivate(context)).toBeFalsy();
    expect(reflector.getAllAndOverride).toHaveBeenCalled();
  });
});
