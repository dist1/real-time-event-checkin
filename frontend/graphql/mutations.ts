// --- frontend/graphql/mutations.ts ---
import { gql } from 'graphql-request';

export const JOIN_EVENT = gql`
  mutation JoinEvent($eventId: ID!) {
    joinEvent(eventId: $eventId) {
      id
      name
    }
  }
`;