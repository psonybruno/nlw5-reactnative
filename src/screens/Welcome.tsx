import React from 'react';
import { useNavigation } from '@react-navigation/core';
import { Dimensions, Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons'

import wateringImg from '../assets/watering.png'
import colors from '../styles/colors';
import fonts from '../styles/fonts';


const Welcome: React.FC = () => {  
  const navigation = useNavigation();
  const handleStart = () => {
    navigation.navigate('UserIdentification')
  }  
  
  return(    
    <SafeAreaView style={{
      flex: 1,         
      }}>
      <View style={{
        flex: 1, 
        paddingHorizontal: 20,
        alignItems: 'center', 
        justifyContent: 'space-around',
        }}>
        <Text style={{
          fontSize: 28,           
          textAlign:'center', 
          lineHeight: 34,
          color: colors.heading, 
          marginTop: 38,
          fontFamily: fonts.heading
          }}>
          Gerencie {'\n'} suas plantas de {'\n'} forma fácil
        </Text>
        <Image 
          style={{
            width: Dimensions.get('window').width * 0.7,
            height: 284,
          }}
          resizeMode="contain"
          source={wateringImg} />
        <Text style={{
          textAlign:'center', 
          fontSize: 18, 
          paddingHorizontal: 20, 
          color: colors.heading,
          fontFamily: fonts.text
          }}>
          Não esqueça mais de regar suas plantas. Nós cuidamos de lembrar você sempre que precisar.
        </Text>

        <TouchableOpacity 
          onPress={handleStart}
          activeOpacity={0.7}
          style={{
            backgroundColor: colors.green, 
            justifyContent: 'center', 
            alignItems: 'center', 
            borderRadius: 16, 
            marginBottom: 10, 
            height: 56, 
            width: 56,
          }}>
          <Text 
            style={{color: colors.blue_light, fontSize: 24}}>
            <Feather 
              name="chevron-right" 
              style={{
                fontSize: 32,
                color: colors.white
              }} 
              />
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>    
  );
}

export default Welcome;