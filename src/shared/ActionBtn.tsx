import React, {useMemo} from 'react';
import {TouchableOpacity, TouchableOpacityProps} from 'react-native';
import tw from '../../tailwind';
import ThemedText from './ThemedText';

interface IProps extends TouchableOpacityProps {
  title?: string;
  variant?: 'lg' | 'md' | 'sm';
  colorVariant?: 'primary' | 'secondary' | 'tertiary' | 'danger' | 'success'; // Added color variant prop
}

const ActionBtn: React.FC<IProps> = ({
  title = 'Create',
  variant = 'lg',
  colorVariant = 'primary', // Default to 'primary' color
  ...rest
}) => {
  // Memoize computed styles for better performance
  const buttonStyles = useMemo(() => {
    const sizeStyles = {
      lg: 'h-[60px] px-8',
      md: 'h-[50px] px-6',
      sm: 'h-[40px] px-4',
    };

    // Define color mapping based on the utility (colorVariant)
    const colorStyles = {
      primary: 'bg-gray-100', // Purple background
      secondary: 'bg-[#FF5733]', // Red background
      tertiary: 'bg-[#1E90FF]', // Blue background
      danger: 'bg-[#FF0000]', // Red background for danger
      success: 'bg-[#28a745]', // Green background for success
    };

    return [
      tw`items-center justify-center rounded  ${sizeStyles[variant]} ${colorStyles[colorVariant]}`,
    ];
  }, [variant, colorVariant]);

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

  // Map ActionBtn variant to Tailwind text color for text
  const generateTextColor = useMemo(() => {
    switch (colorVariant) {
      case 'primary':
        return 'text-white'; // White text for primary button (with purple background)
      case 'secondary':
        return 'text-white'; // White text for secondary button (with red background)
      case 'tertiary':
        return 'text-white'; // White text for tertiary button (with blue background)
      case 'danger':
        return 'text-white'; // White text for danger button (with red background)
      case 'success':
        return 'text-white'; // White text for success button (with green background)
      default:
        return 'text-white'; // Default to white text
    }
  }, [colorVariant]);

  return (
    <TouchableOpacity style={[...buttonStyles, tw` `]} {...rest}>
      <ThemedText variant={generateVariant} color={generateTextColor}>
        {title}
      </ThemedText>
    </TouchableOpacity>
  );
};

export default ActionBtn;
