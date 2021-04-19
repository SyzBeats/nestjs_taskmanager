// this repository is interacting with the database of users

import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as argon2 from 'argon2';
import { EntityRepository, Repository } from 'typeorm';
import { DB_ERROR_CODES } from 'src/typings/enums';
import { SignupCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';

/**
 * the repository pattern is a specific way of handling the
 * logic for database entities. This repository can be injected into
 * any related service @see https://docs.nestjs.com/techniques/database#repository-pattern
 */
@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(signupCredentialsDto: SignupCredentialsDto) {
    const { username, password } = signupCredentialsDto;

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

  async validateUserPassword(
    signupCredentialsDto: SignupCredentialsDto,
  ): Promise<string> {
    const { username, password } = signupCredentialsDto;

    // this refers to the user entity as this is the users repository
    const user = await this.findOne({ username });

    // validate if user was found and correct password inserted
    if (user && user.validatePassword(password)) return user.username;
    else return null;
  }
}
