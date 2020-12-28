import { Platform } from "react-native";

const theme = {
  roundness: 3,
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#586069',
    primary: '#0366d6',
    textReverse: '#fafafa',
    textFaded: '#707070',
    light: 'white',
    faded: '#e1e4e8',
    danger: '#a20a0a',
    darkBckgrnd: '#24292e'
  },
  fontSizes: {
    body: 14,
    subheading: 16,
    heading: 24,
  },
  fonts: {
    main: Platform.select({
      android: 'Roboto',
      ios: 'Arial',
      default: 'System'
    }),
    closeButton: Platform.select({
      android: 'monospace',
      ios: 'Arial',
      default: 'System'
    })
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  }
};

export default theme;