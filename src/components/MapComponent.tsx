import Geolocation from '@react-native-community/geolocation';
import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {Alert, Platform, View} from 'react-native';
import {GeoError, GeoPosition} from 'react-native-geolocation-service';
import MapView, {MapPressEvent, Marker, Polygon} from 'react-native-maps';
import {
  openSettings,
  PERMISSIONS,
  request,
  RESULTS,
} from 'react-native-permissions';
import tw from '../../tailwind';
import {Coordinate, Fence, Region} from '../interfaces/shared';
import {LocationMarker} from '../lib/icons';
import ActionBtn from '../shared/ActionBtn';
import {showToast} from '../utils/showToast';

interface IProps {
  onSaveFence: (fence: Fence) => void;
}
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
const MapComponent: React.FC<IProps> = ({onSaveFence}) => {
  const [state, setState] = useState(initialState);
  const navigation = useNavigation();
  /* The `handleMapPress` function is a callback function created using the `useCallback` hook in React.
 It is triggered when a user presses on the map. */
  const handleMapPress = useCallback(
    (event: MapPressEvent) => {
      const coordinate = event?.nativeEvent?.coordinate;

      if (state.isDrawing && coordinate) {
        setState(prev => ({
          ...prev,
          coordinates: [...prev.coordinates, coordinate],
        }));
      } else {
        showToast({
          type: 'error',
          message: 'Coordinate is null or event is invalid',
        });
        // console.warn('Coordinate is null or event is invalid');
      }
    },
    [state.isDrawing],
  );

  /* The `handleSave` function is a callback function created using the `useCallback` hook in React. It
is responsible for saving the fence coordinates when called. Here is a breakdown of what it does: */
  const handleSave = useCallback(() => {
    const coordinates = state.coordinates;
    onSaveFence({id: Date.now(), coordinates});
    setState(prev => ({...prev, coordinates: [], isDrawing: false}));
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  }, [navigation, onSaveFence, state.coordinates]);
  // Center the map on the current location
  const centerMap = useCallback(() => {
    if (state.location) {
      setState(prev => ({
        ...prev,
        region: {
          latitude: state.location?.latitude ?? 0,
          longitude: state.location?.longitude ?? 0,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
      }));
    } else {
      Alert.alert('Location not available', 'Please allow location access.');
    }
  }, [state.location]);
  // Request location permission
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
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
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
    requestLocationPermission();
  }, []);
  // console.log(new Date().)
  return (
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
        {state.location && (
          <Marker
            coordinate={{
              latitude: state.location.latitude,
              longitude: state.location.longitude,
            }}>
            <LocationMarker />
            {/* You can replace 'red' with any color or a custom icon */}
          </Marker>
        )}
      </MapView>
      <View style={tw`  items-center justify-center`}>
        <View
          style={tw` absolute bottom-5   flex-row  flex-wrap gap-3  justify-center  items-start `}>
          {/* <Button title="Center Location" onPress={centerMap} /> */}
          <ActionBtn
            variant="sm"
            colorVariant="primary"
            title="Center Location"
            onPress={centerMap}
            // style={tw` bg-red-500`}
          />
          <ActionBtn
            variant="sm"
            colorVariant="primary"
            title={state.isDrawing ? 'Stop Drawing' : 'Start Drawing'}
            onPress={() =>
              setState(prev => ({...prev, isDrawing: !state.isDrawing}))
            }
          />

          {state.coordinates.length > 0 && (
            <ActionBtn
              variant="sm"
              colorVariant="success"
              title="Save Fence"
              onPress={handleSave}
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default MapComponent;
