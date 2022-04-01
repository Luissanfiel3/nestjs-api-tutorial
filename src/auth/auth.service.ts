import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as argon from 'argon2';
import { AuthDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private config: ConfigService) {}

  async signup(dto: AuthDto) {
    // generate the password hash
    const hash = await argon.hash(dto.password);
    // save the new user in the db
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          firstName: dto.firstName,
          lastName: dto.lastName,
          hash,
        },
      });

      delete user.hash;
      // return the saved user
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  }

  async signin(dto: AuthDto) {
    // find the user by email
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    // if user does not exist throw exception
    if (!user) throw new ForbiddenException('Credentials incorrect');

    // compare password
    const pwMatches = await argon.verify(user.hash, dto.password);
    // if password incorrect throw exception
    if (!pwMatches) throw new ForbiddenException('Credentials incorrect');
    delete user.hash;
    return user;
  }

  async findAllUsers() {
    return this.prisma.user.findMany();
  }

  async updateUser(id, dto: AuthDto): Promise<object> {
    try {
      return this.prisma.user.update({
        where: { id: Number(id) },
        data: dto,
      });
    } catch (err) {

    console.log(err)

//       if (error instanceof PrismaClientKnownRequestError) {
//         console.error('Código de error', error.code);
//     /*     if (error.code === 'P2015') {
//           throw new ForbiddenException('user to delete not found');
//         } */
//       }
      //throw error;
    }
  }
   async deleteUser(userId: number){

      const user = await this.prisma.user.findUnique({
          where: {
          id: Number(userId)
          },
      });

      if(!user)
        throw new ForbiddenException (
         'user to delete not found'
        ),


      await this.prisma.user.delete({
           data: user
      })

   }
}
