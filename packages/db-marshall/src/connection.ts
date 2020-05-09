import { ClassType } from '@marcj/estdlib'
import { getDatabaseName } from '@marcj/marshal'
import { resolveCollectionName } from '@marcj/marshal-mongo'
import { Collection, MongoClient, Db } from 'mongodb'

import { config } from './config'

// https://github.com/marcj/marshal.ts/blob/a02b29cb73a907f23c4a78c656ced08db0ead2b5/packages/mongo/src/connection.ts#L6
export class Connection {
  client!: MongoClient

  db!: Db

  host = this.getHost()

  defaultDatabase = config.get('mongodb_name')

  username = config.get('mongodb_user')

  password = config.get('mongodb_pass')

  async close(force?: boolean) {
    if (this.client) {
      await this.client.close(force)
    }
  }

  async connect(): Promise<MongoClient> {
    if (this.client) {
      return this.client
    }

    const auth =
      config.get('mongodb_user') && config.get('mongodb_pass')
        ? {
            user: config.get('mongodb_user'),
            password: config.get('mongodb_pass'),
          }
        : undefined

    this.client = await MongoClient.connect(this.getHost(), {
      auth,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      ignoreUndefined: true,
      keepAlive: false,
    })

    this.db = this.client.db()

    return this.client
  }

  // eslint-disable-next-line class-methods-use-this
  protected getHost(): string {
    const port = config.get('mongodb_port')
    const name = config.get('mongodb_name')

    let host = `mongodb://${config.get('mongodb_host')}`

    if (port !== 21017) {
      host += `:${port}`
    }

    if (name) {
      host += `/${name}`
    }

    return host
  }

  async getCollection(classType: ClassType<any>): Promise<Collection> {
    return (await this.connect())
      .db(getDatabaseName(classType) || this.defaultDatabase)
      .collection(resolveCollectionName(classType))
  }
}
