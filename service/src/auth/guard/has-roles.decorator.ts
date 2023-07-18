import { SetMetadata } from '@nestjs/common';
import { Role } from '../enum/role.enum';

export const HAS_ROLES_KEY = 'roles';
export const HasRoles = (...roles: Role[]) => SetMetadata(HAS_ROLES_KEY, roles);
