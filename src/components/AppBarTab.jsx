import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import Text from './Text';

const styles = StyleSheet.create({
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

export default AppBarTab;

