import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { GraphQLOptions } from './graphql.options';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      useClass: GraphQLOptions
    }),
    AuthModule,
    UsersModule
  ]
})
export class AppModule {}
