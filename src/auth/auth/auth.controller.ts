import { Controller, Inject, Post, Query } from '@nestjs/common';
import { User } from '@prisma/client';
import { AuthRepository } from '../auth-repository/auth-repository';

@Controller('/api/auth')
export class AuthController {
  @Inject()
  private authRepository: AuthRepository;

  // - /auth/login           // Login user
  @Post('/login')
  postLogin() {}
  // - /auth/register        // Registrasi user baru
  @Post('/register')
  async postRegister(
    @Query('username') username: string,
    @Query('email') email: string,
    @Query('password') password: string,
    @Query('phone') phone?: string,
  ): Promise<User> {
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
