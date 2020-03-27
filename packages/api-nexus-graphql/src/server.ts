import { ApolloServer } from 'apollo-server'
import { createContext } from './context'
import { makeSchema } from 'nexus'
import * as types from './schema'
import { nexusPrismaPlugin } from 'nexus-prisma'

export const schema = makeSchema({
  types: types,
  plugins: [nexusPrismaPlugin()],
  outputs: {
    schema: __dirname + '/schema.graphql',
    typegen: __dirname + '/generated/nexus.ts',
  },
  typegenAutoConfig: {
    contextType: 'Context.Context',
    sources: [
      {
        source: require.resolve('./context'),
        alias: 'Context',
      },
    ],
  },
})

export const server = new ApolloServer({
  schema,
  context: createContext,
})
