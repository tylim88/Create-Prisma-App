import { Prisma } from 'prisma-binding'
import { fragmentReplacements } from './resolvers/index'

const prisma = new Prisma({
  typeDefs: process.env.PRISMA_SCHEMA,
  endpoint: `http://${process.env.PRISMA_IP}:${process.env.PRISMA_PORT}/${
    process.env.PRISMA_SERVICE
  }/${process.env.PRISMA_STAGE}`,
  secret: process.env.PRISMA_SECRET,
  fragmentReplacements,
})

export { prisma as default }
