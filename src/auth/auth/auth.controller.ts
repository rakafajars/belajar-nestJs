import {
  Body,
  Controller,
  Get,
  Header,
  HttpException,
  Inject,
  Post,
  Query,
  UseFilters,
  UseInterceptors,
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
import { TimeInterceptor } from 'src/time/time.interceptor';
import { Auth } from '../auth.decorator';
import { Roles } from 'src/role/role.decorator';

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
  @Header('Content-Type', 'application/json')
  @UseInterceptors(TimeInterceptor)
  postLogin(
    @Query('username') username: string,
    @Body()
    request: LoginUserRequest,
  ) {
    return {
      data: `Hello ${request.username} ${username}`,
    };
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

  @Get('/current')
  @Roles(['admin', 'operator'])
  current(@Auth() user: User): Record<string, any> {
    return {
      data: `hello ${user.username} ${user.email}`,
    };
  }

  // - /auth/refresh-token   // Memperbarui access token
  // - /auth/forgot-password // Request reset password
  // - /auth/reset-password  // Reset password
  // - /auth/verify-email    // Verifikasi email
  // - /auth/me             // Get profile user yang sedang login
}
