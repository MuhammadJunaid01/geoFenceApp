import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {View} from 'react-native';
import MapView, {Polygon} from 'react-native-maps';
import tw from '../../tailwind';
import {RootStackParamList} from '../interfaces/navigation.interface';
import {useAppSelector} from '../redux/hooks';
import ActionBtn from '../shared/ActionBtn';
import ThemedText from '../shared/ThemedText';

const Home = () => {
  const {fences} = useAppSelector(state => state.geoFence);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <View style={tw` flex-1  p-3`}>
      {fences.length === 0 && (
        <View style={tw`  flex-1 items-center justify-center`}>
          <ThemedText variant="h3" style={tw` text-center  `}>
            No fences yet. Click "Add New Map" to create one!
          </ThemedText>
        </View>
      )}
      {fences.length > 1 && (
        <View style={tw` flex-1`}>
          <MapView
            style={tw` flex-1`}
            onPress={handleMapPress}
            region={state.region || undefined}
            showsMyLocationButton
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            showsBuildings
            showsCompass
            // showsUserLocation
            showsTraffic
            zoomControlEnabled
            // showsCompass
          >
            {state.coordinates.length > 0 && (
              <Polygon
                coordinates={state.coordinates}
                fillColor="rgba(0, 150, 136, 0.5)"
              />
            )}
          </MapView>
        </View>
      )}
      <View style={tw` items-center justify-center`}>
        <View style={tw` absolute bottom-6 w-full`}>
          <ActionBtn
            title="Add New Map"
            colorVariant="primary"
            variant="md"
            onPress={() => {
              navigation.navigate('Map');
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default Home;
