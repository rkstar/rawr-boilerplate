import React from 'react'
import {render} from 'react-dom'
import {ApolloProvider} from 'react-apollo'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'
import {store, history, apolloClient} from './store'
import {MainLayout} from './layouts'
import {Form} from './views'

import './styles/main.css'

const RouterRoot = ()=>{
  // here you can run any kind of functions or set vars
  // you might want to do before the router component
  // is returned...

  return (
    <ApolloProvider client={apolloClient} store={store}>
      <Router history={history}>
        <Route path='/' component={MainLayout}>
          <IndexRoute component={Form} />
        </Route>
      </Router>
    </ApolloProvider>
  )
}

// render the router component to the page!
render(<RouterRoot />, document.getElementById('root'))