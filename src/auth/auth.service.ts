import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserRepository } from './user.repository';

/**
 * @description The service is called by the controller and execustes
 * a defined logic for the given route and parameters.
 *
 * If the logic itself would be heavily tied to the underlying DB model
 * it makes sense to cource them out into a dedicated repository
 */
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  signup(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.signup(authCredentialsDto);
  }
}
