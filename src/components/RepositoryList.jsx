import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import theme from '../theme';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.colors.faded,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const { repositories } = useRepositories();

  // Get the nodes from the edges array
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];


  const renderItem = ({item}) => {
    return (
      <RepositoryItem
        repo={item}
        />
    );
  };
  return (
    <View>
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={renderItem}
        keyExtractor={(repo) => repo.id}
      />
    </View>
  );
};

export default RepositoryList;