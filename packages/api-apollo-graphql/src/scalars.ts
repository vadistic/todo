import { GraphQLScalarType, Kind } from 'graphql'

export const DateTime = new GraphQLScalarType({
  name: 'Date',
  description: 'Date scalar type',
  parseValue(value) {
    return new Date(value)
  },
  serialize(value) {
    return value.getTime()
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(ast.value)
    }
    return null
  },
})
