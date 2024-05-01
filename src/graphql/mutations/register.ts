import { gql } from '@apollo/client'

export const REGISTER_MUTATION = gql`
  mutation Register($email: String!, $password: String!) {
    register(email: $email, password: $password) {
      accessToken
      refreshToken
    }
  }
`
