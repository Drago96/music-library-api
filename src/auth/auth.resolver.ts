import { Resolver, Mutation, Args } from '@nestjs/graphql';

import { AuthService } from './auth.service';
import { AuthCreateDto } from './dto/auth-create.dto';
import { GqlAuthGuard } from './auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation()
  async signIn(@Args() authPayload: AuthCreateDto) {
    return await this.authService.signIn(authPayload);
  }

  @Mutation()
  async signUp(@Args() authPayload: AuthCreateDto) {
    return await this.authService.signUp(authPayload);
  }
}
