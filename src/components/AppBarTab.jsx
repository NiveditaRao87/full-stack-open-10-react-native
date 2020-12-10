import React from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import Text from './Text';

const AppBarTab = ({name}) => {
  return (
    <TouchableWithoutFeedback onPress={() => alert('Pressed!')}>
      <View>
        <Text color='textReverse' fontSize='heading' fontWeight='bold'>{name}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AppBarTab;

