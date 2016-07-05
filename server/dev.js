import path from 'path'
import express from 'express'
import {apolloServer} from 'apollo-server'
import {schema, resolvers} from './graphql'
import webpack from 'webpack'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackDevMiddleware from 'webpack-dev-middleware'
import config from '../config/webpack.config.dev'

const host = 'localhost',
  port = 3000

const app = express(),
  compiler = webpack(config)

// we want to trust our proxy thru haproxy so that
// we can get the client ip address in our resolvers
app.enable('trust proxy')

// webpack hot reloading...
app.use(webpackDevMiddleware(compiler,{
  noInfo: true,
  publicPath: config.output.publicPath
}))
app.use(webpackHotMiddleware(compiler))

// serve static assets
// NOTE: this path is relative to the dir that
// the node process starting this app was executed from!!
app.use(express.static(path.resolve(__dirname, "../dist/client")))

// set up the apollo server middleware
app.use('/graphql', apolloServer(request => {
  return {
    graphiql: true,
    pretty: true,
    schema,
    resolvers,
    context: request
  }
}))

// send back the index.html path for all requests that come in
app.get("*", (req, res)=>{
  res.sendFile(path.resolve(__dirname, "../dist/client/index.html"))
})

// start listening!
app.listen(port, (err)=>{
  if( err ){
    return console.log(err)
  }

  console.log(`listening at http://${host}:${port}`)
})