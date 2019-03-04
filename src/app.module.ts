import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { GraphQLOptions } from './graphql.options';

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      useClass: GraphQLOptions
    })
  ]
})
export class AppModule {}
