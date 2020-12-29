import React from 'react';
import { View , StyleSheet } from 'react-native';
import { format } from 'date-fns';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.light,
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

const Review = ({ review, myreview }) => {
  return (
    <View style={[styles.container, styles.flexContainer]}>
    <Text fontWeight='bold' style={styles.rating}>{review.rating}</Text>
    <View style={styles.flexShrink}>
      <Text fontWeight='bold' fontSize='subheading' testID='repo-name'>{myreview ? review.repository.fullName : review.user.username} </Text>
      <Text fontSize='subheading' color='textFaded' testID='repo-desc'>{format(new Date(review.createdAt), 'dd.mm.yyyy')} </Text>
      <Text>
        {review.text}
      </Text>
    </View>
    </View>
  );
};

export default Review;