import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, ActivityIndicator } from 'react-native';

import Header from '../components/Header';
import api from '../services/api';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { useNavigation } from '@react-navigation/core';

import { EnviromentButton } from '../components/EnviromentButton';
import PlantCardPrimary from '../components/PlantCardPrimary';
import Loading from '../components/Loading';
import { PlantProps } from '../libs/storage';


interface EnviromentProps 
{
  key: string,
  title: string,
}

const PlantSelect: React.FC = () => 
{
  const [enviroments, setEnviroments] = useState<EnviromentProps[]>([]);
  const [plants, setPlants] = useState<PlantProps[]>([]);
  const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(true);
  const [enviromentSelected, setEnviromentSelected] = useState('all');

  const navigation = useNavigation()

  async function fetchPlants()
  {
    const {data} = await api.get(`plants?_sort=name&_order=asc&_page=${page}&_limit=8`);  
    
    if(!data)
      return setLoading(true);
    
    if(page > 1){
      setPlants(oldValue => [...oldValue, ...data])
    }else{
      setPlants(data)
      setFilteredPlants(data);
    }      
    setLoading(false)
    setLoadingMore(false);
  }

  useEffect(() => 
  {
    async function fetchEnviroment()
    {
      const {data} = await api.get('plants_environments?_sort=title&_order=asc');      
      setEnviroments([
        {
          key: 'all',
          title: 'Todos',
        }, 
        ...data
      ])
    }
    fetchEnviroment()
  }, [])

  useEffect(() => 
  {
    fetchPlants()
  }, [])

  const handleEnviromentSelected = (enviroment: string) => 
  {
    setEnviromentSelected(enviroment);
    if(enviroment === 'all')
      return setFilteredPlants(plants);

    const filtered = plants.filter(plant => plant.environments.includes(enviroment))
    setFilteredPlants(filtered)
  };

  const handleFetchMore = (distance: number) => 
  {
    if(distance < 1) return;
    setLoadingMore(true);
    setPage(oldValue => oldValue + 1);
    fetchPlants();
  }

  const handlePlantSelect = (plant: PlantProps) => 
  {
    navigation.navigate('PlantSave',{plant})
  }

  if(loading === true) 
    return <Loading />

  return (
    <View style={{flex: 1, backgroundColor: colors.background}}>
      <View style={{paddingHorizontal: 30}}>
        <Header />
        <Text style={{fontSize: 17, color: colors.heading, fontFamily: fonts.heading, lineHeight: 20, marginTop: 15}}>Em qual ambiente</Text>
        <Text style={{fontSize: 17, color: colors.heading, fontFamily: fonts.text, lineHeight: 20}}>você quer colocar sua planta?</Text>
      </View>

      <View>
        <FlatList 
          data={enviroments}
          keyExtractor={(item) => String(item.key)}
          renderItem={({item}) => (
            <EnviromentButton title={item.title} active={item.key === enviromentSelected} onPress={() => handleEnviromentSelected(item.key)} /> 
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={
            {
              height: 40,
              justifyContent: 'center',
              paddingBottom: 5,
              marginLeft: 32,
              marginVertical: 32,    
            }
          }
          />                
      </View>

      <View style={{flex: 1, paddingHorizontal: 32, justifyContent: 'center'}}>
        <FlatList 
          data={filteredPlants}
          keyExtractor={(item) => String(item.id)}
          renderItem={({item}) => (
            <PlantCardPrimary data={item} onPress={() => handlePlantSelect(item)} />
          )}
          showsVerticalScrollIndicator={false}
          numColumns={2} 
          onEndReachedThreshold={0.1}
          onEndReached={({distanceFromEnd}) => handleFetchMore(distanceFromEnd)}   
          ListFooterComponent={
            loadingMore
            ? <ActivityIndicator color={colors.green} />
            : <></>
          }      
        />
        
      </View>
      
    </View>
  );
}

export default PlantSelect;