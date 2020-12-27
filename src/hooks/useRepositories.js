import { useQuery } from '@apollo/react-hooks';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (orderBy, orderDirection, searchKeyword) => {
  const { data } = useQuery(GET_REPOSITORIES,{
    fetchPolicy: 'cache-and-network',
    variables: { orderBy, orderDirection, searchKeyword }
  });

  if(!data){
    return [];
  }
  const { repositories } = data;
  
  return { repositories };
};

export default useRepositories;