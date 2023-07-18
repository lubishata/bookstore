import { Role } from '../enum/role.enum';

export interface JwtPayload {
  readonly sub: number;
  readonly email: string;
  readonly roles: Role[];
}
