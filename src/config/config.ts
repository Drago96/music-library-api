import * as convict from 'convict';

export const config = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV'
  },
  port: {
    doc: 'The port the server should run on.',
    format: 'port',
    default: 5000,
    env: 'PORT',
    arg: 'port'
  },
  prisma: {
    url: {
      doc: 'The url the prisma service is hosted on.',
      format: 'url',
      default:
        'http://Splot-Publi-3W1GK4W09127-546103147.eu-west-1.elb.amazonaws.com/music-library-api/dev',
      env: 'PRISMA_URL'
    }
  },
  jwt: {
    secret: {
      doc: 'The secret used for jwt validation.',
      default: 'myJwtSecret',
      env: 'JWT_SECRET'
    }
  }
});
