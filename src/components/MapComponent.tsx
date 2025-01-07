/* eslint-disable @typescript-eslint/no-shadow */
import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {Alert, View} from 'react-native';
import {GeoPosition} from 'react-native-geolocation-service';
import MapView, {MapPressEvent, Marker, Polygon} from 'react-native-maps';
import tw from '../../tailwind';
import {Coordinate, Fence, Region} from '../interfaces/shared';
import {LocationMarker} from '../lib/icons';
import {setRegion} from '../redux/features/geoFenceSlice';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import ActionBtn from '../shared/ActionBtn';
import {requestLocationPermission} from '../utils';
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
  const dispatch = useAppDispatch();
  const [state, setState] = useState(initialState);
  const {region} = useAppSelector(state => state.geoFence);
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

  useEffect(() => {
    requestLocationPermission(region => dispatch(setRegion(region)));
  }, [dispatch]);

  return (
    <View style={tw` flex-1`}>
      <MapView
        style={tw` flex-1`}
        onPress={handleMapPress}
        region={region || undefined}
        showsMyLocationButton
        initialRegion={{
          latitude: region?.latitude || 37.78825,
          longitude: region?.longitude || -122.4324,
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
        {region && (
          <Marker
            coordinate={{
              latitude: region.latitude,
              longitude: region.longitude,
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
