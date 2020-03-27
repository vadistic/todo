/* eslint-disable @typescript-eslint/camelcase */
import convict from 'convict'

export const config = convict({
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
})

config.loadFile('./.env.json')
