import React from 'react'
import ReactDOM from 'react-dom'

import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { split } from 'apollo-client-preset'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'

import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

const wsLink = new WebSocketLink({
  uri: 'wss:///subscriptions.graph.cool/v1/cjevne9ha1jaw0152xt3lns8z',
  options: {
    reconnect: true
  }
})

const httpLink = new HttpLink({ uri: 'https://api.graph.cool/simple/v1/cjevne9ha1jaw0152xt3lns8z' })

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  httpLink
)

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)
registerServiceWorker()
