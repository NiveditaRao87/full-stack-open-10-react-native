import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Route, Switch, Redirect } from 'react-router-native';
import RepositoryList from './RepositoryList';
import Repository from './Repository';
import AppBar from './AppBar';
import theme from '../theme';
import SignIn from './SignIn';
import SignUp from './SignUp';
import CreateReview from './CreateReview';
import MyReviews from './MyReviews';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.faded,
  },
});

const Main = () => {

  return (
    <View style={styles.container}>
      <AppBar />
      <Switch>
        <Route path="/" exact>
          <RepositoryList />
        </Route>
        <Route path='/sign-in'>
          <SignIn />
        </Route>
        <Route path='/sign-up'>
          <SignUp />
        </Route>
        <Route path='/create-review'>
          <CreateReview />
        </Route>
        <Route path='/my-reviews'>
          <MyReviews />
        </Route>
        <Route path='/:id'>
          <Repository />
        </Route>
        <Redirect to="/" />
      </Switch>
    </View>
  );
};

export default Main;