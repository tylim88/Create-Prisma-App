import { GraphQLServer, PubSub } from 'graphql-yoga'
import { resolvers, fragmentReplacements } from './resolvers/index'
import prisma from './prismaBinding'

const pubsub = new PubSub()

const server = new GraphQLServer({
  typeDefs: process.env.CLIENT_SCHEMA,

  resolvers,

  context(request) {
    return {
      pubsub,
      prisma,
      request,
    }
  },
  fragmentReplacements,
})

export { server as default }
