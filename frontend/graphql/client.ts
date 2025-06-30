// frontend/graphql/client.ts
import { GraphQLClient } from 'graphql-request';

export let authToken = '';

export const setAuthToken = (token: string) => {
  authToken = token;
};

export const client = new GraphQLClient('http://192.168.0.104:4000/graphql', {
  headers: () => ({
    Authorization: `Bearer ${authToken}`,
  }),
});