/* eslint-disable @typescript-eslint/no-shadow */
import Geolocation from '@react-native-community/geolocation';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {Alert, Platform, View} from 'react-native';
import {GeoError, GeoPosition} from 'react-native-geolocation-service';
import MapView, {Polygon, Region} from 'react-native-maps';
import {
  openSettings,
  PERMISSIONS,
  request,
  RESULTS,
} from 'react-native-permissions';
import tw from '../../tailwind';
import {RootStackParamList} from '../interfaces/navigation.interface';
import {Coordinate} from '../interfaces/shared';
import {useAppSelector} from '../redux/hooks';
import ActionBtn from '../shared/ActionBtn';
import ThemedText from '../shared/ThemedText';
interface IState {
  coordinates: Coordinate[];
  isDrawing: boolean;
  location: GeoPosition['coords'] | null;
  region: Region | null;
}
const initialState: IState = {
  coordinates: [],
  isDrawing: false,
  location: null,
  region: null,
};
const Home = () => {
  const {fences} = useAppSelector(state => state.geoFence);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [state, setState] = useState(initialState);
  const requestLocationPermission = async () => {
    try {
      const permission =
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
          : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

      const result = await request(permission);
      if (result === RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          position => {
            setState(prev => ({
              ...prev,
              location: position.coords,
              region: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              },
            }));
          },
          (error: GeoError) => {
            Alert.alert('Error getting location', error.message);
          },
          {enableHighAccuracy: true, timeout: 30000, maximumAge: 10000}, // Increase timeout
        );
      } else if (result === RESULTS.DENIED) {
        Alert.alert(
          'Permission Required',
          'Location permission is required. Please enable it in settings.',
          [{text: 'OK', onPress: () => openSettings()}],
        );
      } else {
        Alert.alert('Permission Denied', 'Location access is not allowed.');
      }
    } catch (err) {
      console.error('Permission error:', err);
    }
  };
  useEffect(() => {
    // requestLocationPermission(region => dispatch(setRegion(region)));
    requestLocationPermission();
  }, []);
  console.log(fences);
  return (
    <View style={tw`flex-1 p-3`}>
      {/* Display message if no fences */}
      {fences.length === 0 && (
        <View style={tw`flex-1 items-center justify-center`}>
          <ThemedText variant="h3" style={tw`text-center`}>
            No fences yet. Click "Add New Map" to create one!
          </ThemedText>
        </View>
      )}

      {/* Display map if there are fences */}
      {fences.length > 0 && (
        <View style={tw`flex-1`}>
          <MapView
            style={tw`flex-1`}
            // onPress={handleMapPress}
            initialRegion={{
              latitude: state.region?.latitude || 22.35181453333333,
              longitude: state.region?.longitude || 91.84479628333332,
              latitudeDelta: state.region?.latitudeDelta || 0.0922,
              longitudeDelta: state.region?.longitudeDelta || 0.0421,
            }}
            region={
              state.region
                ? {
                    latitude: state.region.latitude,
                    longitude: state.region.longitude,
                    latitudeDelta: state.region.latitudeDelta,
                    longitudeDelta: state.region.longitudeDelta,
                  }
                : undefined
            }
            showsMyLocationButton
            showsBuildings
            showsCompass
            showsUserLocation
            showsTraffic
            zoomControlEnabled>
            {fences.length > 0 &&
              fences.map((fence, i) => {
                return (
                  <Polygon
                    key={i}
                    coordinates={fence.coordinates}
                    fillColor="rgba(0, 150, 136, 0.5)"
                  />
                );
              })}
            {/* {state.location && (
          <Marker
            coordinate={{
              latitude: state.location.latitude,
              longitude: state.location.longitude,
            }}>
            <LocationMarker />
          </Marker>
        )} */}
          </MapView>
        </View>
      )}

      {/* Add New Map Button */}
      <View style={tw`items-center justify-center`}>
        <View style={tw`absolute bottom-6 w-full`}>
          <ActionBtn
            title="Add New Map"
            colorVariant="primary"
            variant="md"
            onPress={() => navigation.navigate('Map')}
          />
        </View>
      </View>
    </View>
  );
};

export default Home;
