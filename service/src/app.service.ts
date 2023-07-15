import { Injectable } from '@nestjs/common';
import { UserDto } from './users/dto/user.dto/user.dto';

@Injectable()
export class AppService {
  
  getHello(): string {
    return 'Hello World!';
  }
}
