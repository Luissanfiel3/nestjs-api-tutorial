import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Param,
  Delete
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";

// import { User, Bookmark } from '@prisma/client';

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @Post("signup")
  signup(@Body() dto: AuthDto) {
    console.log(dto);
    return this.authService.signup(dto);
  }

  @Post("signin")
  signin(@Body() dto: AuthDto) {

    return this.authService.signin(dto);
  }

 /* @Get("users")
  users() {
    return this.authService.findAllUsers();
  }*/

  /*@Put("user/:id")
  async user(
    @Param("id") id: string,
    @Body() dto: AuthDto
  ): Promise<object> {
    return this.authService.updateUser(id, dto);
  }


  @Delete("user/:id")
  async deleteUser(
    @Param("id") id: number
  ) {
    return this.authService.deleteUser(id);
  }*/
}
