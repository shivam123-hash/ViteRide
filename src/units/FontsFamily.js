import { Platform } from 'react-native';

const FontFamily = {
  regular: Platform.select({
    ios: 'System',
    android: 'sans-serif',
  }),
  medium: Platform.select({
    ios: 'System',
    android: 'sans-serif-medium',
  }),
  semiBold: Platform.select({
    ios: 'System',
    android: 'sans-serif-medium',
  }),
  bold: Platform.select({
    ios: 'System',
    android: 'sans-serif',
  }),
};

export default FontFamily;