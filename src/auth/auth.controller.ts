import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

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
  signup(
    @Body(AuthValidationPipe)
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<void> {
    return this.authService.signup(authCredentialsDto);
  }
}
