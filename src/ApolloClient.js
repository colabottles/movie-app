import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://0kadddxyh3.execute-api.us-east-1.amazonaws.com', // Replace with your GraphQL endpoint
  cache: new InMemoryCache(),
});

export default client;
