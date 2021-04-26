import React, { useEffect, useState } from 'react';
import { View, Image, Text, Alert } from 'react-native';
import colors from '../styles/colors';

import Header from '../components/Header' 
import waterdrop from '../assets/waterdrop.png'
import { FlatList } from 'react-native-gesture-handler';
import { PlantProps, loadPlant, StoragePlantProps, removePlant } from '../libs/storage';
import { formatDistance } from 'date-fns';
import { pt } from 'date-fns/locale';
import fonts from '../styles/fonts';
import PlantCardSecondary from '../components/PlantCardSecondary';
import Loading from '../components/Loading';


const MyPlants: React.FC = () => {
  const [myPlants, setMyPlants] = useState<PlantProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [nextWatered, setNextWatered] = useState<string>();

  useEffect(() => 
  { 
    async function loadStorageData()
    {
      const plantStoraged = await loadPlant();
      const nextTime = formatDistance(
        new Date(plantStoraged[0].dateTimeNotification).getTime(), 
        new Date().getTime(), 
        {locale: pt}
      )
      setNextWatered(
        `Não esqueça de regar a ${plantStoraged[0].name} à ${nextTime} horas.`
      )    

      setMyPlants(plantStoraged);
      setLoading(false)
    }
    loadStorageData()
   }, [])

   const handleRemove = (plant: PlantProps) => 
   {
     Alert.alert('Remover', `Deseja remover a ${plant.name}?`, [
        {
          text: 'Não 🤟', 
          style: 'cancel'
        },
        {
          text: 'Sim 😙', 
          onPress: async () => {
            try {
              await removePlant(plant.id)
              setMyPlants((oldData) => 
                oldData.filter((item) => item.id !== plant.id)
              );
            } catch (error) {
              Alert.alert('Não foi possível remover! ')
            }
          }
        }
     ] )
   }
  
  if(loading === true) 
    return <Loading />

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-between', paddingHorizontal:30, paddingTop:50, backgroundColor: colors.background }}>
      <Header />

      <View style={
        { 
          backgroundColor: colors.blue_light,
          paddingHorizontal: 20,
          borderRadius: 20,
          height: 110,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }
        }
        >
        <Image  
          source={waterdrop}
          style={{ width:60, height: 60 }}
          />        
        <Text style={{ flex: 1, color: colors.blue, paddingHorizontal: 20, }}>
          {nextWatered}
        </Text>
      </View>

      <View style={{ flex: 1, width: '100%' }}>
        <Text style={
          { 
            fontSize: 24,
            fontFamily: fonts.heading,
            color: colors.heading,
            marginVertical: 20
           }
        }>
          Próximas regadas
        </Text>

        <FlatList
          data={myPlants}
          keyExtractor={(item) => String(item.id)}
          renderItem={({item}) => (
            <PlantCardSecondary data={item} handleRemove={() => {handleRemove(item)}} />
          )}          
          showsVerticalScrollIndicator={false}
          />
      </View>

    </View>
  );
}

export default MyPlants;