import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useHistory } from 'react-router-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import FormikTextInput from './FormikTextInput';
import Button from './Button';
import theme from '../theme';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_REVIEW } from '../graphql/mutations';

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
  repositoryOwner: '',
  repositoryName: '',
  reviewText: '',
  rating: ''
};

const rangeError = 'Rating should be a whole number between 0 and 100';

const validationSchema = yup.object().shape({
  repositoryOwner: yup
    .string()
    .required('Repository owner name is required'),
  repositoryName: yup
    .string()
    .required('Repository name is required'),
  rating: yup
    .number()
    .required('Rating is required')
    .integer(rangeError)
    .min(0,rangeError)
    .max(100,rangeError)
});

const ReviewForm =  ({ onSubmit }) => {

  return (
    <View style={styles.container} >
      <FormikTextInput 
        name='repositoryOwner' 
        placeholder="Repository owner's name"
        style={[styles.box, styles.input]}
        testID='repositoryOwnerField'
      />
      <FormikTextInput
        name='repositoryName'
        placeholder='Repository Name'
        style={[styles.box, styles.input]}
        testID='repositoryNameField'
      />
      <FormikTextInput
        name='rating'
        placeholder='Rating between 0 and 100'
        style={[styles.box, styles.input]}
        testID='ratingField'
      />
      <FormikTextInput
        name='reviewText'
        placeholder='Review'
        style={[styles.box, styles.input]}
        testID='reviewTextField'
        multiline
      />
      <Button onPress={onSubmit} style={styles.button}>Create review</Button>
    </View>
  );
};

export const CreateReviewContainer = ({onSubmit}) => {
  return (
    <Formik 
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
    {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const CreateReview = () => {

  const history = useHistory();
  const [createReview] = useMutation(CREATE_REVIEW);

  const onSubmit = async (values) => {
    const { repositoryOwner, repositoryName, rating, reviewText } = values;

    try {
      const {data} = await createReview({
        variables: {
          repositoryOwner,
          repositoryName,
          rating: parseInt(rating),
          reviewText
        }
      });
      history.push(`/${data.createReview.repositoryId}`);
    }
    catch(e) {
      console.log(e);
    }
  };

  return (
    <CreateReviewContainer onSubmit ={onSubmit} />
  );
};

export default CreateReview;