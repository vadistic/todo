import dotenv from 'dotenv'

import { createApi } from './api'
import { config } from './config'

const main = async () => {
  config.loadFile('./.env.json')
  dotenv.config()
  config.validate({ allowed: 'strict' })

  const api = await createApi()

  api.app.listen({ port: api.port }, () => {
    console.log(`🚀 Server ready`)
  })
}

main()
