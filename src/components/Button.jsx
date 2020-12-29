import React from 'react';
import { TouchableWithoutFeedback, View, StyleSheet } from 'react-native';

import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    minWidth: 64,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.roundness,
  }
});

const Button = ({ children, style, ...props }) => {
  const buttonStyle = [
    styles.container, 
    style,
    !props.danger 
      ? { backgroundColor: theme.colors.primary }
      : { backgroundColor: theme.colors.danger },
  ];


  return (
    <TouchableWithoutFeedback {...props}>
      <View style={buttonStyle}>
        <Text color='textReverse' fontSize={props.fontSize} fontWeight="bold">{children}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Button;