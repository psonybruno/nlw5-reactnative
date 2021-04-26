import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { Alert, Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, Text, TextInput, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage'

import Button from '../components/Button';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

const UserIdentification: React.FC = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [name, setName] = useState<string>('');

  const navigation = useNavigation();

  const handleSubmit = async() => 
  {
    if(!name)
      return Alert.alert(`Me diga como posso te chamar ${'\n'}😢`)
    
      try {
        await AsyncStorage.setItem('@plantmanager:user', name);
        navigation.navigate('Confirmation', {
          title: 'Prontinho',
          subtitle: 'Agora vamos começar a cuidar das suas plantinhas com muito cuidado',
          buttonTitle: 'Começar',
          icon: 'smile',
          nextScreen: 'PlantSelect'
        })
      } catch (error) {
        Alert.alert(`Não foi possível salvar o seu nome ${'\n'}😢`)
      }
    
    
  }

  const handleInputFocus = () => {
    setIsFocused(true)

  }
  const handleInputBlur= () => {
    setIsFocused(false)
    setIsFilled(!!name)
  }
  const handleInputChange= (value: string) => {
    setIsFilled(!!value)
    setName(value)
  }

  return (
    <SafeAreaView style={{flex: 1, width: '100%', alignItems:'center', justifyContent: 'space-around'}}>
      <KeyboardAvoidingView 
        style={{flex: 1, width: '100%', alignItems:'center', justifyContent: 'space-around'}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{flex:1, width: '100%'}}>   

          <View style={{flex: 1, justifyContent: 'center', paddingHorizontal: 54, alignItems: 'center'}}>
            <View style={{alignItems: 'center'}}>
              <Text style={{fontSize: 44}}>{isFilled ? '😁' : '😀'}</Text>
              <Text style={{fontSize: 24, lineHeight: 32, textAlign: 'center', color: colors.heading, fontFamily: fonts.heading}}>
                Como podemos {'\n'} chamar você?
              </Text>
            </View>

            <TextInput
              style={[
                {
                  borderBottomWidth: 1,
                  borderBottomColor: colors.gray,
                  color: colors.heading,
                  width: '100%',
                  fontSize: 18,
                  marginTop: 50,
                  padding: 10,
                  textAlign: 'center'
                }, 
                (isFocused || isFilled) && {borderBottomColor: colors.green}
              ]}
              placeholder="Digite seu nome"
              onBlur={handleInputBlur}
              onFocus={handleInputFocus}
              onChangeText={handleInputChange}              
            />

            <View style={{marginTop: 40, paddingHorizontal: 20, width: '100%'}}>
              <Button title={'Confirmar'} onPress={handleSubmit} />
            </View>
          </View>   

        </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default UserIdentification;