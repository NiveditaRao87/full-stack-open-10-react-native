import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Text from './Text';
import RepositoryStats from './RepositoryStats';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.backgroundColors.cards,
    marginBottom: 15,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  tinyAvatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
  languageContainer: {
    backgroundColor: theme.colors.primary,
    elevation: 1,
    borderRadius: 10,
    alignSelf: 'flex-start',
    paddingHorizontal: 15,
    paddingVertical: 6,
    marginTop: 10,
    marginBottom: 10,
  },
  flexShrink: {
    flexShrink: 1
  }
});

const RepositoryItem = ({repo}) => {
  return (
    <View style={styles.container}>
      <View style={styles.flexContainer}>
        <Image source={{uri: repo.ownerAvatarUrl}} style = {styles.tinyAvatar} />
        <View style={styles.flexShrink}>
          <Text fontWeight='bold' fontSize='subheading'>{repo.fullName} </Text>
          <Text fontSize='subheading' color='textFaded'>{repo.description} </Text>
          <View style={styles.languageContainer}>
            <Text color='textReverse'>{repo.language}</Text> 
          </View>
        </View>
      </View>
        <View style={styles.flexContainer}>
          <RepositoryStats name='Stars' stats={repo.stargazersCount} />
          <RepositoryStats name='Forks' stats={repo.forksCount} />
          <RepositoryStats name='Reviews' stats={repo.reviewCount} />
          <RepositoryStats name='Rating' stats={repo.ratingAverage} />
        </View>
    </View>
  );
};

export default RepositoryItem;