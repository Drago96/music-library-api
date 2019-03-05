import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string) {
    return await this.prisma.query.user({ where: { id } });
  }

  async findByLoginCredentials(email: string, password: string) {
    const user = await this.prisma.query.user({ where: { email } });

    if (!user) {
      return null;
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      return null;
    }

    return user;
  }

  async create(email: string, password: string) {
    const hashedPassword = await hash(password, 10);

    const user = await this.prisma.mutation.createUser({
      data: {
        email,
        password: hashedPassword
      }
    });

    return user;
  }
}
