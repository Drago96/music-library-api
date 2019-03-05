import { JwtService } from '@nestjs/jwt';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';

import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UsersService } from 'src/users/users.service';
import { Auth } from 'src/graphql.schema';
import { AuthCreateDto } from './dto/auth-create.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async signIn(authPayload: AuthCreateDto): Promise<Auth> {
    const user = await this.usersService.findByLoginCredentials(
      authPayload.email,
      authPayload.password
    );

    if (!user) {
      throw new UnprocessableEntityException('Invalid username or password');
    }

    const token = this.jwtService.sign({ sub: user.id });

    return {
      user,
      token
    };
  }

  async signUp(authPayload: AuthCreateDto): Promise<Auth> {
    const user = await this.usersService.create(
      authPayload.email,
      authPayload.password
    );

    const token = this.jwtService.sign({ sub: user.id });

    return {
      user,
      token
    };
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    return await this.usersService.findById(payload.sub);
  }
}
