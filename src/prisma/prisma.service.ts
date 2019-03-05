import { Injectable } from '@nestjs/common';

import { Prisma } from './prisma.binding';
import { config } from '../config/config';

@Injectable()
export class PrismaService extends Prisma {
  constructor() {
    super({
      endpoint: config.get('prisma.url'),
      debug: false
    });
  }
}
