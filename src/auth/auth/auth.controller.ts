import { Controller, Post } from '@nestjs/common';

@Controller('/api/auth')
export class AuthController {
  // - /auth/login           // Login user
  @Post('/login')
  postLogin() {}
  // - /auth/register        // Registrasi user baru
  @Post('/register')
  postRegister() {}
  // - /auth/logout          // Logout user
  @Post('/logout')
  postLogout() {}
  // - /auth/refresh-token   // Memperbarui access token
  // - /auth/forgot-password // Request reset password
  // - /auth/reset-password  // Reset password
  // - /auth/verify-email    // Verifikasi email
  // - /auth/me             // Get profile user yang sedang login
}
