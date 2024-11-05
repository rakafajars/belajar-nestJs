// export class UserRepository {
//   connection: Connection;

import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma/prisma.service';

//   save() {
//     console.info(`save user with connection ${this.connection.getName()}`);
//   }
// }

// export function createUserRepository(connection: Connection): UserRepository {
//   const userRepository = new UserRepository();
//   userRepository.connection = connection;
//   return userRepository;
// }
@Injectable()
export class UserRepository {
  constructor(private prismaService: PrismaService) {
    console.info('Create User Repository');
  }

  async save(firstName: string, lastName?: string): Promise<User> {
    return this.prismaService.user.create({
      data: {
        first_name: firstName,
        last_name: lastName,
      },
    });
  }
}
