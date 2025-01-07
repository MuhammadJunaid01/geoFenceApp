/* eslint-disable @typescript-eslint/no-shadow */
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import {View} from 'react-native';
import MapView, {Polygon} from 'react-native-maps';
import tw from '../../tailwind';
import {RootStackParamList} from '../interfaces/navigation.interface';
import {setRegion} from '../redux/features/geoFenceSlice';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import ActionBtn from '../shared/ActionBtn';
import ThemedText from '../shared/ThemedText';
import {requestLocationPermission} from '../utils';

const Home = () => {
  const dispatch = useAppDispatch();
  const {fences, region} = useAppSelector(state => state.geoFence);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  useEffect(() => {
    requestLocationPermission(region => dispatch(setRegion(region)));
  }, [dispatch]);
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
            region={region || undefined}
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
            {fences.map((fence, i) => {
              return (
                <Polygon
                  key={i}
                  coordinates={fence.coordinates}
                  fillColor="rgba(0, 150, 136, 0.5)"
                />
              );
            })}
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
