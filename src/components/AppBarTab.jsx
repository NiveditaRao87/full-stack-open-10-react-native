import React from 'react';
import { StyleSheet } from 'react-native';
import Text from './Text';

const styles = StyleSheet.create({
  padding: {
    padding: 10
  }
});

const AppBarTab = ({name}) => {
  return (
    <Text color='textReverse' fontSize='heading' fontWeight='bold' style={styles.padding}>{name}</Text>
  );
};

export default AppBarTab;

