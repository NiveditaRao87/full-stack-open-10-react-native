import React from 'react';
import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight + 20,
    backgroundColor: theme.backgroundColors.appBar,
    height: Constants.statusBarHeight + 70,
    paddingLeft: 10,
  }
});

const AppBar = () => {
  return (<View style={styles.container}>
    <AppBarTab name='Repositories' />
  </View>);
};

export default AppBar;