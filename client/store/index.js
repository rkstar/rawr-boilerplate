import {createStore, compose, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {syncHistoryWithStore, routerReducer} from 'react-router-redux'
import {browserHistory} from 'react-router'
import ApolloClient from 'apollo-client'
import * as reducers from './reducers'

const apolloClient = new ApolloClient()
const rootReducer = combineReducers({
  ...reducers,
  routing: routerReducer,
  apollo: apolloClient.reducer()
})

const enhancers = compose(
  applyMiddleware(apolloClient.middleware(), thunk.withExtraArgument(apolloClient)),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)

const store = createStore(rootReducer, enhancers)

const history = syncHistoryWithStore(browserHistory, store)

export {
  store,
  apolloClient,
  history
}