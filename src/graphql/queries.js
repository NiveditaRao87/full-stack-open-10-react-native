import { gql } from 'apollo-boost';
import { 
  REPOSITORY_BASE_FIELDS, 
  USER_BASE_FIELDS,
  PAGE_INFO_FIELDS } from './fragments';

export const GET_REPOSITORIES = gql`
  query repositories(
    $orderBy: AllRepositoriesOrderBy, 
    $orderDirection: OrderDirection, 
    $searchKeyword: String,
    $first: Int,
    $after: String) {
    repositories(
      orderBy: $orderBy,
      orderDirection: $orderDirection,
      searchKeyword: $searchKeyword,
      first: $first,
      after: $after) {
      edges {
        node {
          ...RepositoryBaseFields
          ratingAverage
          reviewCount
        }
        cursor
      }
      pageInfo {
        ...PageInfoFields
      }
    }
  }
  ${REPOSITORY_BASE_FIELDS}
  ${PAGE_INFO_FIELDS}
`;

export const GET_REPOSITORY = gql`
query repository($id: ID!, $first: Int, $after: String){
    repository(id: $id){
      ...RepositoryBaseFields
      ratingAverage
      reviewCount
      url
      reviews(first: $first, after: $after) {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              ...UserBaseFields
            }
          }
          cursor
        }
        pageInfo {
          ...PageInfoFields
        }
      }
    }
  }
  ${REPOSITORY_BASE_FIELDS}
  ${USER_BASE_FIELDS}
  ${PAGE_INFO_FIELDS}
`;

export const AUTHORIZED_USER = gql`
query {
  authorizedUser {
    ...UserBaseFields
  }
}

${USER_BASE_FIELDS}
`;