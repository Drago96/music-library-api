import { GraphQLError } from 'graphql';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { Catch } from '@nestjs/common';
import { get, some } from 'lodash';
import { ValidationError } from 'apollo-server-express';

interface PrismaExceptionOptions {
  unique?:
    | {
        message: string;
      }
    | boolean;
}

@Catch(GraphQLError)
export class PrismaExceptionFilter implements GqlExceptionFilter {
  constructor(private readonly exceptionOptions: PrismaExceptionOptions = {}) {}

  catch(exception: GraphQLError) {
    return [this.parseUniqueConstraintViolation(exception), exception].find(
      parsedException => parsedException !== null
    );
  }

  private parseUniqueConstraintViolation(exception: GraphQLError) {
    if (
      this.exceptionOptions.unique &&
      this.hasUniqueConstraintViolation(exception)
    ) {
      return new ValidationError(
        get(this.exceptionOptions.unique, 'message') || 'entity already exists'
      );
    }

    return null;
  }

  private hasUniqueConstraintViolation(exception: GraphQLError) {
    return some(
      get(exception, 'originalError.result.errors'),
      error => get(error, 'code') === 3010
    );
  }
}
