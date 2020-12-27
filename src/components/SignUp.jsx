import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useHistory } from 'react-router-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useMutation } from '@apollo/react-hooks';
import FormikTextInput from './FormikTextInput';
import Button from './Button';
import useSignIn from '../hooks/useSignIn';
import { CREATE_USER } from '../graphql/mutations';
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
  retypedPassword: ''
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required'),
  retypedPassword: yup
    .string()
    .oneOf([yup.ref('password'), null],'Passwords do not match  ')
    .required('Password confirmation is required')
});

const SignUpForm =  ({ onSubmit }) => {

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
      <FormikTextInput
        name='retypedPassword'
        placeholder='Password confirmation'
        style={[styles.box, styles.input]}
        secureTextEntry 
        testID='passwordConfirmationField'
      />
      <Button onPress={onSubmit} style={styles.button}>Sign up</Button>
    </View>
  );
};

export const SignUpContainer = ({onSubmit}) => {
  return (
    <Formik 
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
    {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const SignUp = () => {

  const [signIn ] = useSignIn();
  const history = useHistory();
  const [createUser] = useMutation(CREATE_USER);

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const {data} = await createUser({
        variables: {
          username,
          password
        }
      });
      await signIn({ username, password });
      history.push('/');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SignUpContainer onSubmit ={onSubmit} />
  );
};

export default SignUp;