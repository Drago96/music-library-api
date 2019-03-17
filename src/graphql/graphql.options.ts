import { GqlOptionsFactory, GqlModuleOptions } from '@nestjs/graphql';
import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { ApolloError } from 'apollo-server-core';

@Injectable()
export class GraphQLOptions implements GqlOptionsFactory {
  createGqlOptions(): GqlModuleOptions {
    return {
      typePaths: ['src/!(prisma)/**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql/graphql.schema.ts'),
        outputAs: 'class'
      },
      context: ({ req }) => ({ req }),
      formatError: error => {
        if (error.extensions.code === 'INTERNAL_SERVER_ERROR') {
          throw this.internalServerError;
        }

        return error;
      }
    };
  }

  private get internalServerError() {
    return new ApolloError(
      'an internal server error occurred',
      'INTERNAL_SERVER_ERROR'
    );
  }
}
