import React, { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getStatusBarHeight} from 'react-native-iphone-x-helper'

import colors from '../styles/colors';
import userImg from '../assets/42554984.png'
import fonts from '../styles/fonts';


const Header: React.FC = () => 
{
  const [userName, setUserName] = useState('');

  useEffect(() => 
  {
    async function loadStorageUserName()
    {
      const user = await AsyncStorage.getItem('@plantmanager:user')
      setUserName(user || '');
    }
    loadStorageUserName()
  }, [userName])

  return (
    <View style={
      {
        width: '100%', 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        paddingVertical: 20, 
        marginTop: getStatusBarHeight(),      
      }
      }>
      <View>
        <Text style={{fontSize: 32, color: colors.heading, fontFamily: fonts.heading}}>Olá,</Text>
        <Text style={{fontSize: 32, color: colors.heading, fontFamily: fonts.text, lineHeight: 40}}>{userName}</Text>
      </View>

      <Image source={userImg} style={{width: 70, height: 70, borderRadius: 40}} />
    </View>
  );
}

export default Header;