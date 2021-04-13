// this repository is interacting with the database of users

import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { DB_ERROR_CODES } from 'src/typings/enums';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signup(authCredentialsDto: AuthCredentialsDto) {
    const { username, password } = authCredentialsDto;

    const user = new User();

    user.username = username;

    user.password = password;

    try {
      await user.save();
    } catch (error) {
      if (error.code === DB_ERROR_CODES.DUPLICATE_KEY) {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
