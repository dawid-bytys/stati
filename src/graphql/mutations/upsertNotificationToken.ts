import { gql } from '@apollo/client'

export const UPSERT_NOTIFICATION_TOKEN_MUTATION = gql`
  mutation UpsertNotificationToken($token: String!, $deviceUniqueId: String!) {
    upsertNotificationToken(token: $token, deviceUniqueId: $deviceUniqueId)
  }
`
