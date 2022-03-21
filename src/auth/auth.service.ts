import { Injectable } from '@nestjs/common';

@Injectable({})
export class AuthService {
  singup() {
    return { msg: 'Ihave signed up' };
  }
  signin() {
    return { msg: 'Ihave signed in' };;
  }
}

// const service = new AuthService();
