import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

// Global Module
@Global()
@Module({
  providers: [PrismaService],
  // agar bisa pake di module lainnya
  exports: [PrismaService],
})
export class PrismaModule {}
