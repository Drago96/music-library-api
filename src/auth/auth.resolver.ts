import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { AuthenticationError } from 'apollo-server-express';

import { AuthCreateDto } from './dto/auth-create.dto';
import { UsersService } from 'src/users/users.service';

@Resolver('Auth')
export class AuthResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  @Mutation()
  async signIn(@Args() authPayload: AuthCreateDto) {
    const user = await this.usersService.findByLoginCredentials(
      authPayload.email,
      authPayload.password
    );

    if (!user) {
      throw new AuthenticationError('invalid username or password');
    }

    const token = this.jwtService.sign({ sub: user.id });

    return {
      user,
      token
    };
  }

  @Mutation()
  async signUp(@Args() authPayload: AuthCreateDto) {
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
}
