// --- frontend/graphql/queries.ts ---
import { gql } from 'graphql-request';

export const GET_EVENTS = gql`
  query GetEvents {
    events {
      id
      name
      location
      startTime
    }
  }
`;

export const GET_ME = gql`
  query Me {
    me {
      id
      name
      email
    }
  }
`;