import React from 'react';
import { createRoot } from 'react-dom/client';
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import './index.css';
import App from './App';

const client = new ApolloClient({
  uri: "https://0kadddxyh3.execute-api.us-east-1.amazonaws.com/graphql/",
  cache: new InMemoryCache()
});

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
);