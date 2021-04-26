import React from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native'

import loadAnimation from '../assets/load.json'

const Loading: React.FC = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <LottieView
        source={loadAnimation}
        autoPlay
        loop
        style={{backgroundColor: 'transparent', width: 200, height: 200}}
        />
    </View>
  );
}

export default Loading;