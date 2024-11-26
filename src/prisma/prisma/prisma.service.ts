import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super();
    console.info('Create prisma service');
  }

  async onModuleInit() {
    console.info('Connect Prisma');
    await this.$connect();
  }

  async onModuleDestroy() {
    console.info('Disconnet Prisma');
    await this.$disconnect();
  }
}
