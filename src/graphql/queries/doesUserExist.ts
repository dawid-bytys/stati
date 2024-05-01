import { gql } from '@apollo/client'

export const DOES_USER_EXIST_QUERY = gql`
  query DoesUserExist($email: String!) {
    doesUserExist(email: $email)
  }
`
