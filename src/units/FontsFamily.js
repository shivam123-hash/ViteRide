import { Platform } from 'react-native';

export const FONT_FAMILY = {
  regular: Platform.select({
    ios: 'Inter18pt-Regular',
    android: 'Inter_18pt-Regular',
  }),
  medium: Platform.select({
    ios: 'Inter18pt-Medium',
    android: 'Inter_18pt-Medium',
  }),
  semiBold: Platform.select({
    ios: 'Inter18pt-SemiBold',
    android: 'Inter_18pt-SemiBold',
  }),
  bold: Platform.select({
    ios: 'Inter18pt-ExtraBold',
    android: 'Inter_18pt-ExtraBold',
  }),
};

export default FONT_FAMILY;