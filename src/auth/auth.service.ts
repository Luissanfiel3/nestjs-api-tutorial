import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  singup() {
    return { msg: 'Ihave signed up' };
  }
  signin() {
    return { msg: 'Ihave signed in' };
  }
}

// const service = new AuthService();
