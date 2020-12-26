import React, { useState } from 'react';
import { FlatList, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useHistory } from 'react-router-native';
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

const RepositoryOrder = () => {
  return null;
}

export const RepositoryListContainer = ({ repositories, onOrderChange })  => {

  const history = useHistory();

  // Get the nodes from the edges array
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];


  const renderItem = ({item}) => {
    return (
      <TouchableOpacity onPress={() => history.push(`/${item.id}`)}>
        <RepositoryItem
        repo={item}
        />
      </TouchableOpacity>
    );
  };
  return (
    <View>
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={renderItem}
        keyExtractor={(repo) => repo.id}
        ListHeaderComponent={() => <RepositoryOrder onOrderChange={onOrderChange} />}
      />
    </View>
  );
};

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState();
  const [orderDirection, setOrderDirection] = useState();
  const { repositories } = useRepositories(orderBy, orderDirection);

  const handleOrderChange = (orderSelect) => {
    setOrderBy(orderSelect === 'latest' ? 'CREATED_AT' : 'RATING_AVERAGE');
    setOrderDirection(orderSelect === 'lowest' ? 'ASC' : 'DESC');
  };

  return <RepositoryListContainer repositories={repositories} onOrderChange={handleOrderChange} />;
};

export default RepositoryList;