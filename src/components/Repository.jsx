import React from 'react';
import { View , FlatList, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import { format } from 'date-fns';
import { GET_REPOSITORY } from '../graphql/queries';
import { useParams } from 'react-router-native';
import RepositoryItem from './RepositoryItem';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.light,
    marginBottom: 15,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  rating: {
    width: 50,
    height: 50,
    lineHeight: 40,
    fontSize: 24,
    borderWidth: 2,
    borderRadius: 25,
    borderColor: theme.colors.primary,
    color: theme.colors.primary,
    textAlign: 'center',
    marginRight: 20,
    flexShrink: 0
  },
  flexShrink: {
    flexShrink: 1
  }
});

const RepositoryInfo = ({repository}) => {
  return (
    <View>
      <RepositoryItem repo={repository} showUrl={true}/>
    </View>
  );
};

const ReviewItem = ({ review }) => {
  return (
    <View style={[styles.container, styles.flexContainer]}>
    <Text fontWeight='bold' style={styles.rating}>{review.rating}</Text>
    <View style={styles.flexShrink}>
      <Text fontWeight='bold' fontSize='subheading' testID='repo-name'>{review.user.username} </Text>
      <Text fontSize='subheading' color='textFaded' testID='repo-desc'>{format(new Date(review.createdAt), 'dd.mm.yyyy')} </Text>
      <Text>
        {review.text}
      </Text>
    </View>
    </View>
  );
};

const Repository = () => {
  const id = useParams().id;

  const { data, loading } = useQuery(GET_REPOSITORY,{
    fetchPolicy: 'cache-and-network',
    variables: { id }
  });
  const reviews = data && data.repository.reviews;
  const reviewNodes = reviews
    ? reviews.edges.map(edge => edge.node)
    : [];

  if(loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={data.repository} />}
      // ...
    />
  );

};

export default Repository;