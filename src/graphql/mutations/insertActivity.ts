import { gql } from '@apollo/client'

export const INSERT_ACTIVITY_MUTATION = gql`
  mutation InsertActivity($friendUri: String!, $timestampMs: Float!) {
    insertActivity(friendUri: $friendUri, timestampMs: $timestampMs)
  }
`
