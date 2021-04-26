import React from 'react';
import { View } from 'react-native';

import {createStackNavigator} from '@react-navigation/stack'
import colors from '../styles/colors';
import Welcome from '../screens/Welcome';
import UserIdentification from '../screens/UserIdentification';
import Confirmation from '../screens/Confirmation';
import PlantSelect from '../screens/PlantSelect';
import AuthRoutes from './tab.routes';
import PlantSave from '../screens/PlantSave';

const stackRoutes = createStackNavigator();

const AppRoutes: React.FC = () => {
  return (
    <stackRoutes.Navigator
      headerMode="none"
      screenOptions={{
        cardStyle: {
          backgroundColor: colors.white
        },
      }}
      >
      <stackRoutes.Screen
        name="Welcome"
        component={Welcome} />

      <stackRoutes.Screen
        name="UserIdentification"
        component={UserIdentification} />

      <stackRoutes.Screen
        name="Confirmation"
        component={Confirmation} />

      <stackRoutes.Screen
        name="PlantSelect"
        component={AuthRoutes} />

      <stackRoutes.Screen
        name="PlantSave"
        component={PlantSave} />

      <stackRoutes.Screen
        name="MyPlants"
        component={AuthRoutes} />

    </stackRoutes.Navigator>
  );
}

export default AppRoutes;