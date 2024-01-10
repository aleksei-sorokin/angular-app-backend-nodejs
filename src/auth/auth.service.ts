import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { IUser } from '../types/types';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(email);
    const passwordIsMatch = await argon2.verify(user.password, pass);
    if (user && passwordIsMatch) {
      return user;
    }

    throw new UnauthorizedException('User or password is incorrect!');
  }

  async login(user: IUser) {
    const { id, email, name, job_title, tech_stack } = user;
    return {
      id,
      email,
      name,
      job_title,
      tech_stack,
      access_token: this.jwtService.sign({ id: user.id, email: user.email }),
    };
  }
}
