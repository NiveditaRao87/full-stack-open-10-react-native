import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Link } from 'react-router-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight + 20,
    backgroundColor: theme.backgroundColors.appBar,
    height: Constants.statusBarHeight + 70,
    paddingLeft: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  }
});

const AppBar = () => {
  return (
  <View style={styles.container}>
    <ScrollView horizontal>
      <Link to='/'>
        <View>
          <AppBarTab name='Repositories' />
        </View>
      </Link>
      <Link to='/signin'>
        <View>
          <AppBarTab name='Sign In' />
        </View>
      </Link>
    </ScrollView>
  </View>
  );
};

export default AppBar;