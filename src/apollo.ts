import { ApolloClient, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { createHttpLink } from '@apollo/client/link/http'
import { Config } from 'react-native-config'
import { useBoundStore } from './store/boundStore'

const httpLink = createHttpLink({
  uri: Config.GRAPHQL_URL,
})

const authLink = setContext((_, { headers }) => {
  const gqlAccessToken = useBoundStore.getState().gqlAccessToken

  return {
    headers: {
      ...headers,
      authorization: gqlAccessToken ? `Bearer ${gqlAccessToken}` : '',
    },
  }
})

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
  defaultOptions: {
    query: {
      fetchPolicy: 'no-cache',
    },
  },
})
