import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import * as Linking from 'expo-linking';
import Text from './Text';
import Button from './Button';
import RepositoryStats from './RepositoryStats';
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

const RepositoryItem = ({repo, showUrl}) => {

  if(!repo){
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.flexContainer}>
        <Image source={{uri: repo.ownerAvatarUrl}} style = {styles.tinyAvatar} />
        <View style={styles.flexShrink}>
          <Text fontWeight='bold' fontSize='subheading' testID='repo-name'>{repo.fullName} </Text>
          <Text fontSize='subheading' color='textFaded' testID='repo-desc'>{repo.description} </Text>
          <View style={styles.languageContainer}>
            <Text color='textReverse' testID='repo-lang'>{repo.language}</Text> 
          </View>
        </View>
      </View>
        <View style={styles.flexContainer}>
          <RepositoryStats name='Stars' stats={repo.stargazersCount} testID='repo-stars' />
          <RepositoryStats name='Forks' stats={repo.forksCount} testID='repo-forks' />
          <RepositoryStats name='Reviews' stats={repo.reviewCount} testID='repo-reviews' />
          <RepositoryStats name='Rating' stats={repo.ratingAverage} testID='repo-rating' />
        </View>
      {showUrl && 
        <Button fontSize='subheading' onPress={() => Linking.openURL(repo.url)}>
          Open in GitHub
        </Button>}
    </View>
  );
};

export default RepositoryItem;