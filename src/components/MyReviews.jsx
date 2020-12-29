import React from 'react';
import { View , FlatList, StyleSheet, Alert } from 'react-native';
import { useMutation, useQuery } from '@apollo/react-hooks';
import * as Linking from 'expo-linking';
import { AUTHORIZED_USER } from '../graphql/queries';
import { DELETE_REVIEW } from '../graphql/mutations';
import Button from './Button';
import ReviewItem from './Review';
import theme from '../theme';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.colors.faded,
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: theme.colors.light,
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  flexGrow: {
    flexGrow: 1,
  },
  marginRight: {
    marginRight: 20
  }

});

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviewItem = ({review, reload}) => {

  const [deleteReview] = useMutation(DELETE_REVIEW);

  const handleDelete = (id) => {
    deleteReview({ variables: { id } });
    reload();
  };

  const createAlert = (id) =>
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "CANCEL",
          style: "cancel"
        },
        { text: "DELETE", onPress: () => handleDelete(id) }
      ],
      { cancelable: false }
    );

  return (
    <>
      <ReviewItem review={review} myreview={true} />
      <View style={styles.buttonGroup}>
        <Button 
          style={{...styles.flexGrow, ...styles.marginRight}} 
          fontSize='subheading'
          onPress={() => Linking.openURL(review.repository.url)}
        > 
          View repository
        </Button>
        <Button 
          style={styles.flexGrow} 
          danger
          fontSize='subheading'
          onPress={() => createAlert(review.id)}
        >
          Delete review
        </Button>
      </View>
    </>
  );

};

const MyReviews = () => {
  
  const { data, refetch } = useQuery(AUTHORIZED_USER,{
    variables: { includeReviews: true }
  });

  const reviewNodes = data 
    && data.authorizedUser
    && data.authorizedUser.reviews 
    ? data.authorizedUser.reviews.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <MyReviewItem review={item} reload={() => refetch()} />}
      keyExtractor={({ id }) => id}
    />
  );
};

export default MyReviews;