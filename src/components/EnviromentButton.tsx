import React, { useState } from 'react';
import { Text, View } from 'react-native';
import {RectButton, RectButtonProps} from 'react-native-gesture-handler'
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface EnviromentButtonProps extends RectButtonProps
{
  title: string;
  active?: Boolean;
}

export function EnviromentButton ({title, active = false, ...rest} : EnviromentButtonProps) {  

  return (
    <RectButton      
      style={
        [
          {
            backgroundColor: colors.shape,
            width: 76,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 12,
            marginHorizontal: 5,
          },
          (active) && {            
            backgroundColor: colors.green_light
          }
        ]
      }      
      {...rest}>
      <Text style={[        
        {
          color: colors.heading, 
          fontFamily: fonts.text
        },
        (active) && {            
          color: colors.green_dark,
          fontFamily: fonts.heading,
        }
      ]}>
        {title}
      </Text>
    </RectButton>
  );
}