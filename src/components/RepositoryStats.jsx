import React from 'react';
import { View, StyleSheet } from 'react-native';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    paddingHorizontal: 20,
    paddingVertical: 10,
    display: 'flex',
    alignItems: 'center'
  }
});

const RepositoryStats = ({name, stats}) => {

  return (
    <View style={styles.container}>
      <Text fontWeight='bold' testID='repo-stats'>{stats > 1000 ? `${(Math.floor(stats/100)/10)}k`: stats}</Text>
      <Text color='textFaded'>{name}</Text>
    </View>
  );
};

export default RepositoryStats;