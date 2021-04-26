import React from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import colors from '../styles/colors';

interface ButtonProps extends TouchableOpacityProps {
  title: string,
}

export function Button ({title, ...rest}: ButtonProps) {
  return (
    <TouchableOpacity 
      activeOpacity={0.7}
      style={{
        backgroundColor: colors.green, 
        justifyContent: 'center', 
        alignItems: 'center', 
        borderRadius: 16,
        height: 56, 
      }}
      {...rest}
      >
      <Text 
        style={{color: colors.blue_light}}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

export default Button;