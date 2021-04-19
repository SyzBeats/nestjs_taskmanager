import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupCredentialsDto } from './dto/auth-credentials.dto';
import { SigninCredentialsDto } from './dto/signin-credentials.dto';

// custom validation pipe

const AuthValidationPipe = new ValidationPipe({
  disableErrorMessages: false,
  skipMissingProperties: false,
});

/**
 * @description the controller takes care of taking in the requests,
 * parameters and their validation. The requests are then distributed
 * to the right service method
 */
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(
    @Body(AuthValidationPipe)
    signupCredentialsDto: SignupCredentialsDto,
  ): Promise<void> {
    return this.authService.signUp(signupCredentialsDto);
  }

  @Post('/signin')
  singIn(@Body(AuthValidationPipe) signinCredentialsDto: SigninCredentialsDto) {
    return this.authService.signIn(signinCredentialsDto);
  }
}
