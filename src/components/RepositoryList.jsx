import React, { useEffect, useState } from 'react';
import { FlatList, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useHistory } from 'react-router-native';
import { useDebounce } from 'use-debounce';
import TextInput from './TextInput';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import theme from '../theme';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.colors.faded,
  },
  searchBar: {
    backgroundColor: theme.colors.light,
    fontSize: 16,
    margin: 10,
    display: 'flex',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'gray'
  },
  textInput: {
    flexGrow: 9,
    borderWidth: 0
  },
  closeButton: {
    fontSize: 20,
    fontFamily: Platform.select({
      android: 'monospace',
      ios: 'Arial',
      default: 'System'
    })
  },
  closeButtonParent: {
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryListHeader = ({onOrderChange, search, order, onSearch}) => {
  
  return (
    <>
      <View style={styles.searchBar}>
        <TextInput 
          placeholder= 'Search...'
          style={styles.textInput}
          onChangeText={(search) => onSearch(search)}
          value={search}
        />
        <TouchableOpacity
            style={styles.closeButtonParent}
            onPress={() => onSearch('')}>
            <Text style={styles.closeButton}>X</Text>
        </TouchableOpacity>
      </View>
      <RNPickerSelect
        onValueChange={(value) => onOrderChange(value)}
        value={order}
        placeholder={{ label: 'Select an item', value: '' }}
        items={[
          { label: 'Latest repositories', value: 'latest' },
          { label: 'Highest rated repositories', value: 'highest' },
          { label: 'Lowest rated repositories', value: 'lowest' }
        ]
      } />
    </>
);
}

export class RepositoryListContainer extends React.Component {
  
  renderHeader = () => {
    const props = this.props;
    
    return (
      <RepositoryListHeader
        onOrderChange={props.onOrderChange}
        search={props.search}
        order={props.order}
        onSearch={props.onSearch}
      />
    );
  };
  
  renderItem = ({item}) => {


    return (
      <TouchableOpacity onPress={() => this.props.redirect(`/${item.id}`)}>
        <RepositoryItem
        repo={item}
        />
      </TouchableOpacity>
    );
  };
  
  render() {

    return (
      <FlatList
        data={this.props.repositories
          ? this.props.repositories.edges.map(edge => edge.node)
          : []}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={this.renderItem}
        keyExtractor={(repo) => repo.id}
        ListHeaderComponent={this.renderHeader}
      />
    );
  }
}

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState();
  const [orderDirection, setOrderDirection] = useState();
  const [order, setOrder] = useState('latest');
  const [search, setSearch] = useState('');
  const [searchKeyword] = useDebounce(search, 500);
  const { repositories } = useRepositories(orderBy, orderDirection, searchKeyword);
  const history = useHistory();

  const handleOrderChange = (orderSelect) => {
    setOrder(orderSelect);
    setOrderBy(orderSelect === 'latest' ? 'CREATED_AT' : 'RATING_AVERAGE');
    setOrderDirection(orderSelect === 'lowest' ? 'ASC' : 'DESC');
  };

  return <RepositoryListContainer 
           repositories={repositories} 
           onOrderChange={handleOrderChange}
           search={search}
           order={order}
           onSearch={search => setSearch(search)}
           redirect={nextRoute => history.push(nextRoute)}
           />;
};

export default RepositoryList;