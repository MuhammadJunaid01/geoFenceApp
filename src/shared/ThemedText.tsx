import React, {memo, useCallback} from 'react';
import {Text, TextProps} from 'react-native';
import tw from '../../tailwind';

type Variant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface IProps extends TextProps {
  variant: Variant;
  color?: string;
}

const ThemedText: React.FC<IProps> = ({
  variant,
  children,
  color = 'text-black',
  ...rest
}) => {
  console.log('color', color);
  const textStyle = useCallback(() => {
    let style = {};
    switch (variant) {
      case 'h1':
        style = {
          fontFamily: 'gilroy',
          fontSize: 24,
          fontWeight: 'bold' as 'bold',
        };
        break;
      case 'h2':
        style = {
          fontFamily: 'gilroy',
          fontSize: 19,
          fontWeight: 'bold' as 'bold',
        };
        break;
      case 'h3':
        style = {
          fontFamily: 'gilroy',
          fontSize: 17,
          fontWeight: '600' as '600',
        };
        break;
      case 'h4':
        style = {
          fontFamily: 'gilroy',
          fontSize: 14,
          lineHeight: 21,
          fontWeight: '500' as '500',
        };
        break;
      case 'h5':
        style = {
          fontFamily: 'gilroy',
          fontSize: 13,
          fontWeight: '400' as '400',
        };
        break;
      case 'h6':
        style = {
          fontFamily: 'gilroy',
          fontSize: 11,
          fontWeight: '300' as '300',
        };
        break;
      default:
        style = {};
        break;
    }

    // Apply dynamic text color here
    return {
      ...style,
    };
  }, [variant]);

  const combinedStyle = textStyle();

  return (
    <Text style={[combinedStyle, tw`${color}`]} {...rest}>
      {children}
    </Text>
  );
};

export default memo(ThemedText);
