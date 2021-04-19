import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignupCredentialsDto } from './dto/auth-credentials.dto';
import { SigninCredentialsDto } from './dto/signin-credentials.dto';
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

  signUp(signupCredentialsDto: SignupCredentialsDto): Promise<void> {
    return this.userRepository.signUp(signupCredentialsDto);
  }

  async signIn(signinCredentialsDto: SigninCredentialsDto): Promise<void> {
    const username = await this.userRepository.validateUserPassword(
      signinCredentialsDto,
    );

    if (!username) throw new UnauthorizedException('Invalid credentials');
  }
}
