import { Inject, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { Logger } from 'winston';

@Injectable()
export class AuthRepository {
  constructor(
    private prismaService: PrismaService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
  ) {
    this.logger.info('Create User Repository');
  }

  async saveUser(
    username: string,
    email: string,
    password: string,
    phone?: string,
  ): Promise<User> {
    this.logger.info(
      `create user with username ${username}, email ${email}, passwrod ${password}`,
    );
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
