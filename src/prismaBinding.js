import { Prisma } from 'prisma-binding'
import { fragmentReplacements } from './resolvers/index'

const prisma = new Prisma({
  typeDefs: process.env.PRISMA_SCHEMA,
  endpoint: process.env.PRISMA_ENDPOINT,
  secret: process.env.PRISMA_SECRET,
  fragmentReplacements,
})

export { prisma as default }
