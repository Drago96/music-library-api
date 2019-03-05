import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { config } from 'src/config/config';
import { AuthResolver } from './auth.resolver';
import { GqlAuthGuard } from './auth.guard';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({ secretOrPrivateKey: config.get('jwt.secret') })
  ],
  providers: [AuthService, AuthResolver, JwtStrategy, GqlAuthGuard]
})
export class AuthModule {}
