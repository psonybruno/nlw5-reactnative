import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Animated from 'react-native-reanimated';
import { SvgFromUri } from 'react-native-svg'

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface PlantProps extends RectButtonProps {
  data: {
    name: string;
    photo: string; 
    hour: string;
  };
  handleRemove: () => void;
}

export const PlantCardSecondary = ({data, handleRemove, ...rest}: PlantProps) => {
  return (
    <Swipeable
      overshootRight={false}
      renderRightActions={() => (
        <Animated.View>
          <View>
            <RectButton 
              onPress={handleRemove} 
              style={
                { 
                  width: 100, 
                  height: 85, 
                  backgroundColor: colors.red, 
                  marginTop: 15, 
                  borderRadius: 20, 
                  justifyContent: 'center',
                  alignItems: 'center', 
                  position: 'relative', 
                  right: 20, 
                  paddingLeft: 15 
                  }
                }
              >
              <Feather name="trash" size={32} color={colors.white} />
            </RectButton>
          </View>
        </Animated.View>
      )}
      >
      <RectButton 
        style={
          {
            width: '100%',
            paddingHorizontal: 10,
            paddingVertical: 25,
            borderRadius: 20,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: colors.shape,
            marginVertical: 5,
          }
        }
        {...rest}
        >
        <SvgFromUri uri={data.photo} width={50} height={50} />
        <Text style={{ flex: 1, marginLeft: 10, fontFamily: fonts.heading, fontSize: 17, color: colors.heading}}>
          {data.name}
        </Text>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={{ fontSize: 16, fontFamily: fonts.text, color: colors.body_light }}>Regar às</Text>
          <Text style={{ marginTop: 5, fontSize: 16, fontFamily: fonts.heading, color: colors.body_dark }}>{data.hour}</Text>
        </View>
      </RectButton>
    </Swipeable>
  );
}

export default PlantCardSecondary;