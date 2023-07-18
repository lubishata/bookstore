import { Role } from '../enum/role.enum';

export interface UserPayload {
  readonly id: number;
  readonly email: string;
  readonly roles: Role[];
}
