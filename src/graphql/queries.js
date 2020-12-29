import { gql } from 'apollo-boost';
import { 
  REPOSITORY_BASE_FIELDS, 
  USER_BASE_FIELDS,
  PAGE_INFO_FIELDS,
  REVIEW_BASE_FIELDS
} from './fragments';

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
            ...ReviewBaseFields
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
  ${REVIEW_BASE_FIELDS}
  ${PAGE_INFO_FIELDS}
`;

export const AUTHORIZED_USER = gql`
query getAuthorizedUser($includeReviews: Boolean = false) {
  authorizedUser {
    ...UserBaseFields
    reviews @include(if: $includeReviews) {
      edges {
        node {
          ...ReviewBaseFields
          repository {
            fullName
            url
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

${USER_BASE_FIELDS}
${REVIEW_BASE_FIELDS}
${PAGE_INFO_FIELDS}
`;