import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma/prisma.service';

@Injectable()
export class AuthRepository {
  constructor(private prismaService: PrismaService) {
    console.info('Create User Repository');
  }

  async saveUser(
    username: string,
    email: string,
    password: string,
    phone?: string,
  ): Promise<User> {
    return this.prismaService.user.create({
      data: {
        username: username,
        email: email,
        password: password,
        phone: phone,
      },
    });
  }
}
