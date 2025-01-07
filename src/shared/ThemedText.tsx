import React, {memo, useCallback} from 'react';
import {Text, TextProps} from 'react-native';

type Variant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface IProps extends TextProps {
  variant: Variant;
}

const ThemedText: React.FC<IProps> = ({variant, children, ...rest}) => {
  const textStyle = useCallback(() => {
    switch (variant) {
      case 'h1':
        return {
          fontFamily: 'gilroy',
          fontSize: 24,
          fontWeight: 'bold' as 'bold', // Explicitly define fontWeight
        };
      case 'h2':
        return {
          fontFamily: 'gilroy',
          fontSize: 19,
          fontWeight: 'bold' as 'bold', // Explicitly define fontWeight
        };
      case 'h3':
        return {
          fontFamily: 'gilroy',
          fontSize: 17,
          fontWeight: '600' as '600', // Explicitly define fontWeight
        };
      case 'h4':
        return {
          fontFamily: 'gilroy',
          fontSize: 14,
          lineHeight: 21,
          fontWeight: '500' as '500', // Explicitly define fontWeight
        };
      case 'h5':
        return {
          fontFamily: 'gilroy',
          fontSize: 13,
          fontWeight: '400' as '400', // Explicitly define fontWeight
        };
      case 'h6':
        return {
          fontFamily: 'gilroy',
          fontSize: 11,
          fontWeight: '300' as '300', // Explicitly define fontWeight
        };
      default:
        return {};
    }
  }, [variant]);

  const combinedStyle = textStyle();

  return (
    <Text style={combinedStyle} {...rest}>
      {children}
    </Text>
  );
};

export default memo(ThemedText);
