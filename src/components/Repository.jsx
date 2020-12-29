import React from 'react';
import { View , FlatList, StyleSheet } from 'react-native';
import { useParams } from 'react-router-native';
import useRepository from '../hooks/useRepository';
import RepositoryItem from './RepositoryItem';
import ReviewItem  from './Review';
import theme from '../theme';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.colors.faded,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryInfo = ({repository}) => {
  return (
    <View>
      <RepositoryItem repo={repository} showUrl={true}/>
    </View>
  );
};

const ReviewList = ({ repository, onEndReached }) => {
  const reviews = repository && repository.reviews;
  const reviewNodes = reviews
    ? reviews.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => <ReviewItem review={item} />}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
    />
  );
};

const Repository = () => {
  const id = useParams().id;

  const { repository, fetchMore } = useRepository({
    id,
    first: 3
    });

  return (
    <ReviewList
      repository={repository}
      onEndReached={() =>  fetchMore()}
    />
  );

};

export default Repository;
