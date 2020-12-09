import React from 'react';
import {Text, View } from 'react-native';

const RepositoryItem = ({repo}) => {
  return (
    <View>
      <Text>Full name: {repo.fullname} </Text>
      <Text>Description: {repo.description} </Text>
      <Text>Language: {repo.language} </Text>
      <Text>Stars: {repo.forksCount} </Text>
      <Text>Forks: {repo.ratingAverage} </Text>
      <Text>Reviews: {repo.reviewCount} </Text>
      <Text>Rating: {repo.ratingAverage} </Text>
    </View>
  );
};

export default RepositoryItem;