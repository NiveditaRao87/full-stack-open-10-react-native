import { useContext } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useApolloClient } from '@apollo/client';
import { AUTHORIZE } from '../graphql/mutations';
import AuthStorageContext from '../contexts/AuthStorageContext';

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHORIZE);
  const authStorage = useContext(AuthStorageContext);
  const apolloClient = useApolloClient();
  const signIn = async ({ username, password }) => {
    const {data} = await mutate({
      variables: { username, password}
    });
    data && data.authorize.accessToken && await authStorage.setAccessToken(data.authorize.accessToken);
    apolloClient.resetStore();

    return {data};
  };
  return [signIn, result];
};

export default useSignIn;