import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useHistory } from "react-router-native";
import { Formik } from 'formik';
import * as yup from 'yup';
import FormikTextInput from './FormikTextInput';
import Text from './Text';
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
    borderRadius: 5,
    margin: 20,
  },
  input: {
    fontSize: theme.fontSizes.heading,
    textAlign: 'center',
  },
  button: {
    paddingVertical: 10,
    backgroundColor: theme.colors.primary,
    alignItems: 'center'
  },
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
      <FormikTextInput name="username" placeholder="Username" style={[styles.box, styles.input]} />
      <FormikTextInput name="password" placeholder="Password" style={[styles.box, styles.input]} secureTextEntry />
      <TouchableOpacity style={[styles.box, styles.button]} onPress={onSubmit}>
        <Text color='textReverse' fontSize='heading'>Sign In</Text>
      </TouchableOpacity>
    </View>
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
    <Formik 
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
    {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;