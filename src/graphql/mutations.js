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

export const CREATE_REVIEW= gql`
mutation createReview(
  $repositoryName: String!,
  $repositoryOwner: String!,
  $rating: Int!,
  $reviewText: String) {
  createReview(
    review: {
      repositoryName: $repositoryName,
      ownerName: $repositoryOwner,
      rating: $rating,
      text: $reviewText
    }
  ) {
      id
      repositoryId
      createdAt
    }
  }
`;

export const CREATE_USER= gql`
mutation createUser($username: String!, $password: String!) {
  createUser(
    user: {
      username: $username, 
      password: $password
    }
  ) {
      ...UserBaseFields
    }
}
${USER_BASE_FIELDS}
`;

export const DELETE_REVIEW= gql`
mutation deleteReview($id: ID!) {
  deleteReview(
    id: $id
  )
}
`;