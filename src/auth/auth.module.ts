import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthRepository } from './auth-repository/auth-repository';
// import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  // KLO TIDAK PAKE GLOBAL MODULE
  // imports: [PrismaModule],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository],
})
export class AuthModule {}
