import ApolloBoost from 'apollo-boost'

const getClient = (jwt) => {
  return new ApolloBoost({
    uri: process.env.NODE_ENDPOINT,
    request(operation) {
      if (jwt) {
        operation.setContext({
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        })
      }
    },
  })
}

export { getClient as default }
