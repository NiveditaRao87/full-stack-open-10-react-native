import React from 'react';
import { RepositoryListContainer } from '../../components/RepositoryList';
import { render } from '@testing-library/react-native';

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        pageInfo: {
          totalCount: 8,
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };

      // Add your test code here
      const { getAllByTestId } = render(<RepositoryListContainer repositories={repositories} />);

      expect(getAllByTestId('repo-name')[0]).toHaveTextContent('jaredpalmer/formik');
      expect(getAllByTestId('repo-name')[1]).toHaveTextContent('async-library/react-async');

      expect(getAllByTestId('repo-desc')[0]).toHaveTextContent('Build forms in React, without the tears');
      expect(getAllByTestId('repo-desc')[1]).toHaveTextContent('Flexible promise-based React data loader');

      expect(getAllByTestId('repo-lang')[0]).toHaveTextContent('TypeScript');
      expect(getAllByTestId('repo-lang')[1]).toHaveTextContent('JavaScript');

      expect(getAllByTestId('repo-stats')[0]).toHaveTextContent('21.8k');
      expect(getAllByTestId('repo-stats')[1]).toHaveTextContent('1.6k');
      expect(getAllByTestId('repo-stats')[2]).toHaveTextContent('3');
      expect(getAllByTestId('repo-stats')[3]).toHaveTextContent('88');

      expect(getAllByTestId('repo-stats')[4]).toHaveTextContent('1.7k');
      expect(getAllByTestId('repo-stats')[5]).toHaveTextContent('69');
      expect(getAllByTestId('repo-stats')[6]).toHaveTextContent('3');
      expect(getAllByTestId('repo-stats')[7]).toHaveTextContent('72');

    });
  });
});