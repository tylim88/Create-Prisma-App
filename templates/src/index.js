import '@babel/polyfill/noConflict'
import server from './server'

server.start({ port: process.env.NODE_PORT || 4000 }, () => {
  console.log('The server is up!')
})
