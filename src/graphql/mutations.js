import { gql } from 'apollo-boost';

import { USER_BASE_FIELDS } from './fragments';

export const AUTHORIZE= gql`
mutation authorize($username: String!, $password: String! ){
  authorize(
    credentials: {
      username: $username,
      password: $password
    }
  ) {
      accessToken
      user {
        ...UserBaseFields
      }
    }
  }
  ${USER_BASE_FIELDS}
`;