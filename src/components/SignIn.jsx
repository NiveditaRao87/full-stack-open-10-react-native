import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useHistory } from 'react-router-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import FormikTextInput from './FormikTextInput';
import Button from './Button';
import useSignIn from '../hooks/useSignIn';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.light
  },
  box: {
    height: 60,
    borderWidth: 1,
    paddingLeft: 20,
    borderRadius: theme.roundness,
    margin: 20,
  },
  input: {
    fontSize: theme.fontSizes.heading,
    textAlign: 'center',
  },
  button: {
    margin: 20
  }
});

const initialValues = {
  username: '',
  password: '',
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required'),
});

const SignInForm =  ({ onSubmit }) => {

  return (
    <View style={styles.container} >
      <FormikTextInput 
        name='username' 
        placeholder='Username'
        style={[styles.box, styles.input]}
        testID='usernameField'
      />
      <FormikTextInput
        name='password'
        placeholder='Password'
        style={[styles.box, styles.input]}
        secureTextEntry 
        testID='passwordField'
        />
      <Button onPress={onSubmit} style={styles.button}>Sign in</Button>
    </View>
  );
};

export const SignInContainer = ({onSubmit}) => {
  return (
    <Formik 
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
    {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const SignIn = () => {

  const [signIn ] = useSignIn();
  const history = useHistory();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const {data} = await signIn({ username, password });
      console.log(data);
      history.push('/');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SignInContainer onSubmit ={onSubmit} />
  );
};

export default SignIn;