import Geolocation from '@react-native-community/geolocation';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Alert, Platform, View} from 'react-native';
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
import {useAppSelector} from '../redux/hooks';
import ActionBtn from '../shared/ActionBtn';
import ThemedText from '../shared/ThemedText';

interface IState {
  location: GeoPosition['coords'] | null;
  region: Region | null;
  isLoading: boolean;
}

const initialState: IState = {
  location: null,
  region: null,
  isLoading: false,
};

const Home = () => {
  const {fences} = useAppSelector(state => state.geoFence);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [state, setState] = useState(initialState);
  const [renderedFences, setRenderedFences] = useState(fences);
  const requestLocationPermission = async () => {
    try {
      setState(prev => ({...prev, isLoading: true})); // Start loading

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
              isLoading: false, // Stop loading after success
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
            setState(prev => ({...prev, isLoading: false})); // Stop loading on error
            Alert.alert('Error getting location', error.message);
          },
          {enableHighAccuracy: true, timeout: 30000, maximumAge: 10000}, // Increased timeout
        );
      } else if (result === RESULTS.DENIED) {
        setState(prev => ({...prev, isLoading: false})); // Stop loading if denied
        Alert.alert(
          'Permission Required',
          'Location permission is required. Please enable it in settings.',
          [{text: 'OK', onPress: () => openSettings()}],
        );
      } else {
        setState(prev => ({...prev, isLoading: false})); // Stop loading for other results
        Alert.alert('Permission Denied', 'Location access is not allowed.');
      }
    } catch (err) {
      setState(prev => ({...prev, isLoading: false})); // Stop loading on exception
      console.error('Permission error:', err);
    }
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);
  useEffect(() => {
    // Update the rendered fences whenever the fences data changes
    setRenderedFences(fences);
  }, [fences]);
  if (state.isLoading) {
    return (
      <View style={tw` flex-1 items-center justify-center`}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }

  return (
    <View style={tw`flex-1`}>
      {fences.length === 0 && (
        <View style={tw`flex-1 items-center justify-center`}>
          <ThemedText variant="h3" style={tw`text-center`}>
            No fences yet. Click "Add New Map" to create one!
          </ThemedText>
        </View>
      )}

      {renderedFences.length > 0 && (
        <View style={tw`flex-1`}>
          <MapView
            style={tw`flex-1`}
            initialRegion={{
              latitude: state.location?.latitude ?? 0,
              longitude: state.location?.longitude ?? 0,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            showsMyLocationButton
            showsBuildings
            showsCompass
            showsUserLocation
            showsTraffic
            zoomControlEnabled>
            {renderedFences.map((fence, i) => (
              <Polygon
                key={fence.id || i} // Use a unique key for better performance
                coordinates={fence.coordinates}
                fillColor="rgba(0, 150, 136, 0.5)"
                tappable
              />
            ))}
          </MapView>
        </View>
      )}
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
