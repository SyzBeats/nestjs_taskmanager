// this repository is interacting with the database of users

import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as argon2 from 'argon2';
import { EntityRepository, Repository } from 'typeorm';
import { DB_ERROR_CODES } from 'src/typings/enums';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';

/**
 * the repository pattern is a specific way of handling the
 * logic for database entities. This repository can be injected into
 * any related service @see https://docs.nestjs.com/techniques/database#repository-pattern
 */
@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signup(authCredentialsDto: AuthCredentialsDto) {
    const { username, password } = authCredentialsDto;

    try {
      const user = new User();

      user.username = username;

      const hash = await argon2.hash(password);
      user.password = hash;

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
