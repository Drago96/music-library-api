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
  }
});
