import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class SigninCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(50)
  // at least 1 uppercase, 1 lowercase, 1number or  special char
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Invalid credentials',
  })
  password: string;
}
