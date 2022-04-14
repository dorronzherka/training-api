import { Injectable, UnauthorizedException} from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';
import { JwtService } from '@nestjs/jwt';
dotenv.config();

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validate(username: string, password: string): Promise<any> {
    const user = await this.userService.findByUsername(username);
    if (user && bcrypt.compareSync(password, user.password)) {
      delete user.password;
      return user;
    }
    return null;
  }

  async login(user: any) {
    const userFound = await this.userService.findByUsername(user.username);
    if (userFound && bcrypt.compareSync(user.password, userFound.password)) {
      delete userFound.password;
      return {
        access_token: this.jwtService.sign({
          id: userFound.id,
          fullname: userFound.fullname,
          username: userFound.username,
          type: userFound.type,
        }),
      };
    }
    throw new UnauthorizedException();
  }
}
