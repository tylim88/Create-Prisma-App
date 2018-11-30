import prisma from '../src/prismaBinding'
import seedDatabase, { userOne } from './utils/seedDatabase'
import getClient from './utils/getClient'
import { createUser, getUsers, login, getProfile } from './utils/operations'

const client = getClient()

beforeEach(seedDatabase)

test('Should create a new user', async () => {
  jest.setTimeout(100000)
  const variables = {
    data: {
      name: 'Andrew',
      email: 'andrew@example.com',
      password: 'MyPass123',
    },
  }
  const response = await client.mutate({
    mutation: createUser,
    variables,
  })

  const exists = await prisma.exists.User({
    id: response.data.createUser.user.id,
  })
  expect(exists).toBe(true)
})

test('Should expose public author profiles', async () => {
  jest.setTimeout(100000)
  const response = await client.query({ query: getUsers })

  expect(response.data.users.length).toBe(2)
  expect(response.data.users[0].email).toBe(null)
  expect(response.data.users[0].name).toBe('Jen')
})

test('Should not login with bad credentials', async () => {
  jest.setTimeout(100000)
  const variables = {
    data: {
      email: 'jen@example.com',
      password: 'red098!@#$',
    },
  }

  await expect(client.mutate({ mutation: login, variables })).rejects.toThrow()
})

test('Should not signup user with invalid password', async () => {
  jest.setTimeout(100000)
  const variables = {
    data: {
      name: 'Andrew',
      email: 'andrew@example.com',
      password: 'pass',
    },
  }

  await expect(
    client.mutate({ mutation: createUser, variables })
  ).rejects.toThrow()
})

test('Should fetch user profile', async () => {
  jest.setTimeout(100000)
  const client = getClient(userOne.jwt)
  const { data } = await client.query({ query: getProfile })

  expect(data.me.id).toBe(userOne.user.id)
  expect(data.me.name).toBe(userOne.user.name)
  expect(data.me.email).toBe(userOne.user.email)
})
