import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AccessToken, JwtPayload } from 'src/typings/interfaces';
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
    private jwtService: JwtService,
  ) {}

  signUp(signupCredentialsDto: SignupCredentialsDto): Promise<void> {
    return this.userRepository.signUp(signupCredentialsDto);
  }

  async signIn(
    signinCredentialsDto: SigninCredentialsDto,
  ): Promise<AccessToken> {
    const username = await this.userRepository.validateUserPassword(
      signinCredentialsDto,
    );

    if (!username) throw new UnauthorizedException('Invalid credentials');

    // pw and username are correct

    const payLoad: JwtPayload = { username };

    const accessToken = await this.jwtService.sign(payLoad);

    return { accessToken };
  }
}
