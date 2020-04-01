import convict from 'convict'

/* eslint-disable @typescript-eslint/camelcase */
export const configSchema = {
  env: {
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV',
  },
  debug: {
    env: 'DEBUG',
    default: false,
  },
  db_file: {
    env: 'DB_FILE',
    default: '',
  },
  db_url: {
    env: 'DB_URL',
    default: '',
  },
}
/* eslint-enable @typescript-eslint/camelcase */

export type ConfigSchema = typeof configSchema

export const config = convict(configSchema)
