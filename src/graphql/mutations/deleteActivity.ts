import { gql } from '@apollo/client'

export const DELETE_ACTIVITY_MUTATION = gql`
  mutation DeleteActivity($friendUri: String!) {
    deleteActivity(friendUri: $friendUri)
  }
`
