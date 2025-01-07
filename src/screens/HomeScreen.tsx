import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {Button, FlatList, Text, View} from 'react-native';
import tw from '../../tailwind';
import {HomeStackParamList} from '../interfaces/navigation.interface';
import {useAppSelector} from '../redux/hooks';
type Props = StackScreenProps<HomeStackParamList, 'Home'>;
const HomeScreen: React.FC<Props> = ({navigation}) => {
  const fences = useAppSelector(state => state.geoFence);
  return (
    <View style={tw` flex-1 bg-white`}>
      <View style={tw` flex-1`}>
        <Text style={tw` text-lg text-gray-600`}>Saved Geo-fences</Text>
        {fences.length === 0 ? (
          <Text>No fences yet. Click "Add New Map" to create one!</Text>
        ) : (
          <FlatList
            data={fences}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => <Text>Fence ID: {item.id}</Text>}
          />
        )}
        <Button
          title="Add New Map"
          onPress={() => navigation.navigate('Map')}
        />
      </View>
    </View>
  );
};

export default HomeScreen;
