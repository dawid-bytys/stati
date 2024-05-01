import { gql } from '@apollo/client'

export const GET_ACTIVITIES_QUERY = gql`
  query GetActivities {
    getActivities {
      friendUri
    }
  }
`
