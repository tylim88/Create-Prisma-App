import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '../../src/prismaBinding'

const userOne = {
  input: {
    name: 'Jen',
    email: 'jen@example.com',
    password: bcrypt.hashSync('Red098!@#$'),
  },
  user: undefined,
  jwt: undefined,
}

const userTwo = {
  input: {
    name: 'Jeff',
    email: 'jeff@example.com',
    password: bcrypt.hashSync('PassForJeff'),
  },
  user: undefined,
  jwt: undefined,
}

const seedDatabase = async () => {
  jest.setTimeout(100000)
  // Delete test data
  await prisma.mutation.deleteManyUsers()

  // Create user one
  userOne.user = await prisma.mutation.createUser({
    data: userOne.input,
  })
  userOne.jwt = jwt.sign({ userId: userOne.user.id }, process.env.JWT_SECRET)

  // Create user two
  userTwo.user = await prisma.mutation.createUser({
    data: userTwo.input,
  })
  userTwo.jwt = jwt.sign({ userId: userTwo.user.id }, process.env.JWT_SECRET)
}

export { seedDatabase as default, userOne, userTwo }
