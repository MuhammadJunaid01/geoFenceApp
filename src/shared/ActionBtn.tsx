import React, {useMemo} from 'react';
import {TouchableOpacity, TouchableOpacityProps} from 'react-native';
import tw from '../../tailwind';
import ThemedText from './ThemedText';

interface IProps extends TouchableOpacityProps {
  label?: string;
  variant?: 'lg' | 'md' | 'sm';
}

const ActionBtn: React.FC<IProps> = ({
  label = 'Create',
  variant = 'lg',
  ...rest
}) => {
  // Memoize computed styles for better performance
  const buttonStyles = useMemo(() => {
    const styles = {
      lg: 'h-[60px] px-8',
      md: 'h-[50px] px-6',
      sm: 'h-[40px] px-4',
    };
    return [tw`${styles[variant]}`];
  }, [variant]);

  // Map ActionBtn variant to ThemedText variant
  const generateVariant = useMemo(() => {
    switch (variant) {
      case 'lg':
        return 'h1'; // Larger button, bigger text
      case 'md':
        return 'h2'; // Medium button, medium text
      case 'sm':
        return 'h3'; // Small button, smaller text
      default:
        return 'h3'; // Default case
    }
  }, [variant]);

  return (
    <TouchableOpacity style={[...buttonStyles]} {...rest}>
      <ThemedText variant={generateVariant}>{label}</ThemedText>
    </TouchableOpacity>
  );
};

export default ActionBtn;
