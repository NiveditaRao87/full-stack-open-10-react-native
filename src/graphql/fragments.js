import { gql } from 'apollo-boost';

export const REPOSITORY_BASE_FIELDS = gql`
  fragment RepositoryBaseFields on Repository {
    id
    name
    ownerName
    fullName
    stargazersCount
    forksCount
    url
    ownerAvatarUrl
    description
    language
    createdAt
  }
`;

export const USER_BASE_FIELDS = gql`
  fragment UserBaseFields on User {
    id
    username
    createdAt
  }
`;

export const PAGE_INFO_FIELDS = gql`
  fragment PageInfoFields on PageInfo {
    hasNextPage
    totalCount
    startCursor
    endCursor
  }
`;