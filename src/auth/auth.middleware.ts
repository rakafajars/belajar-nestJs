import { HttpException, Injectable, NestMiddleware } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma/prisma.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private primaService: PrismaService) {}

  async use(req: any, res: any, next: () => void) {
    const username = req.headers['x-username'] as string;
    if (!username) {
      throw new HttpException('Unauthorized', 401);
    }

    const user = await this.primaService.user.findUnique({
      where: { id: username },
    });

    if (user) {
      req.user = user;
      next();
    } else {
      throw new HttpException('Unauthorized', 401);
    }
  }
}
