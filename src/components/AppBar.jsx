import React, { useContext } from 'react';
import { View, StyleSheet, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { Link } from 'react-router-native';
import { useQuery, useApolloClient } from '@apollo/client';
import Constants from 'expo-constants';
import { AUTHORIZED_USER } from '../graphql/queries';
import AuthStorageContext from '../contexts/AuthStorageContext';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight + 20,
    backgroundColor: theme.colors.darkBckgrnd,
    height: Constants.statusBarHeight + 70,
    paddingLeft: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  padding: {
    padding: 10
  }
});

const AppBarTab = ({name, ...props}) => {
  return (
    <TouchableWithoutFeedback  {...props}>
      <View>
        <Text color='textReverse' fontSize='heading' fontWeight='bold' style={styles.padding}>
          {name}
        </Text>
      </View>
    </TouchableWithoutFeedback>
    
  );
};

const AppBar = () => {
  const { data } = useQuery(AUTHORIZED_USER);
  const authStorage = useContext(AuthStorageContext);
  const apolloClient = useApolloClient();
  const authorizedUser = data ? data.authorizedUser : undefined;

  const handleSignOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
  };
  
  return (
  <View style={styles.container}>
    <ScrollView horizontal>
      <Link to="/" component={AppBarTab} name='Repositories' />
      {authorizedUser 
        ? <>
            <Link to="/create-review" component={AppBarTab} name='Create review' />
            <AppBarTab name='Sign out' onPress={handleSignOut} />
          </>
        : <>
            <Link to="/sign-in" component={AppBarTab} name='Sign in' /> 
            <Link to="/sign-up" component={AppBarTab} name='Sign up' /> 
          </>
      }
    </ScrollView>
  </View>
  );
};

export default AppBar;