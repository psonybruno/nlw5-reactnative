import React from 'react';
import { Text } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { SvgFromUri } from 'react-native-svg'

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface PlantProps extends RectButtonProps {
  data: {
    name: string;
    photo: string; 
  }
}

export const PlantCardPrimary = ({data, ...rest}: PlantProps) => {
  return (
    <RectButton 
      style={
        {
          flex: 1,
          maxWidth: '45%',
          backgroundColor: colors.shape,
          borderRadius: 20,
          paddingVertical: 10,
          alignItems: 'center',
          margin: 10
        }
      }
      {...rest}
      >
      <SvgFromUri uri={data.photo} width={70} height={70} />
      <Text style={{ color: colors.green_dark, fontFamily: fonts.heading, marginVertical: 16}}>
        {data.name}
      </Text>
    </RectButton>
  );
}

export default PlantCardPrimary;