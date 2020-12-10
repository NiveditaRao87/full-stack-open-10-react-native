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
      <Text fontWeight='bold' >{stats > 1000 ? `${(Math.ceil(stats/100)/10)}k`: stats}</Text>
      <Text color='textFaded'>{name}</Text>
    </View>
  );
};

export default RepositoryStats;