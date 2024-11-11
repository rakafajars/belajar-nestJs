import {
  Body,
  Controller,
  HttpException,
  Inject,
  Post,
  Query,
  UseFilters,
  UsePipes,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { AuthRepository } from '../auth-repository/auth-repository';
import {
  LoginUserRequest,
  loginUserRequestValidation,
} from 'src/model/login.model';
import { ValidationPipe } from 'src/validation/validation.pipe';
import { ValidationFilter } from 'src/validation/validation.filter';

@Controller('/api/auth')
export class AuthController {
  @Inject()
  private authRepository: AuthRepository;
  // TODO PIPE SENDIRI
  // @UseFilters(ValidationFilter)
  // @Post('/login')
  // postLogin(
  //   @Body(new ValidationPipe(loginUserRequestValidation))
  //   request: LoginUserRequest,
  // ) {
  //   return `heallo ${request.username}`;
  // }

  // GLOBAL PIPE
  @UsePipes(new ValidationPipe(loginUserRequestValidation))
  @UseFilters(ValidationFilter)
  @Post('/login')
  postLogin(
    @Query('username') username: string,
    @Body()
    request: LoginUserRequest,
  ) {
    return `heallo ${request.username}`;
  }

  // - /auth/register        // Registrasi user baru
  @Post('/register')
  async postRegister(
    @Query('username') username: string,
    @Query('email') email: string,
    @Query('password') password: string,
    @Query('phone') phone?: string,
  ): Promise<User> {
    if (!username) {
      throw new HttpException(
        {
          status: 400,
          message: 'Username is required',
          erros: 'Username is required',
        },
        400,
      );
    }
    return this.authRepository.saveUser(username, email, password, phone);
  }
  // - /auth/logout          // Logout user
  @Post('/logout')
  postLogout() {}
  // - /auth/refresh-token   // Memperbarui access token
  // - /auth/forgot-password // Request reset password
  // - /auth/reset-password  // Reset password
  // - /auth/verify-email    // Verifikasi email
  // - /auth/me             // Get profile user yang sedang login
}
