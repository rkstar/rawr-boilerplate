import path from 'path'
import express from 'express'
import {apolloServer} from 'apollo-server'
import {schema, resolvers} from './graphql'

const host = 'localhost',
  port = 3000,
  clientDir = `./${__dirname}/client`

const app = express()

// we want to trust our proxy thru haproxy so that
// we can get the client ip address
app.enable('trust proxy')

// serve static assets
// NOTE: this path is relative to the dir that
// the node process starting this app was executed from!!
app.use(express.static(clientDir))

// set up the apollo server middleware
app.use('/graphql', apolloServer(request=>{
  return {
    graphiql: false,
    schema,
    resolvers,
    context: request
  }
}))

// send back the index.html path for all requests that come in
app.get("*", (req, res)=>{
  res.sendFile(`${clientDir}/index.html`)
})

// start listening!
app.listen(port, (err)=>{
  if( err ){
    return console.log(err)
  }

  console.log(`listening at http://${host}:${port}`)
})