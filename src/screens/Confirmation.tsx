import React, { useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/core';

import Button from '../components/Button';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface Params 
{
  title: string,
  subtitle: string,
  buttonTitle: string,
  icon: 'smile' | 'hug',
  nextScreen: string,
}

const emojis = {
  hug: '🤗',
  smile: '😄',
}

const Confirmation: React.FC = () => {
  
  const navigation = useNavigation();
  const routes = useRoute()

  const { 
    title,
    subtitle,
    buttonTitle,
    icon,
    nextScreen,
  } = routes.params as Params
  

  const handleMoveOn = () => 
  {
    navigation.navigate(nextScreen);
  }

  return (
    <SafeAreaView style={{flex: 1, alignItems: 'center', justifyContent: 'space-around'}}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%', padding: 30}}>

        <Text style={{fontSize: 78}}>{emojis[icon]}</Text>
        <Text style={{fontSize: 22, fontFamily: fonts.heading, textAlign: 'center', color: colors.heading, lineHeight: 38, marginTop: 15}}>{title}</Text>
        
        <Text style={{fontFamily: fonts.text, textAlign: 'center',fontSize: 17, paddingVertical: 10, color: colors.heading}}>
          {subtitle}
        </Text>

        <View style={{width: '100%', paddingHorizontal: 50, marginTop: 20 }}>
          <Button title={buttonTitle} onPress={handleMoveOn} />
        </View>

      </View>      
    </SafeAreaView>
  );
}

export default Confirmation;