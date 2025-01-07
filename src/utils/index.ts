import Geolocation from '@react-native-community/geolocation';
import {Alert, Platform} from 'react-native';
import {GeoError} from 'react-native-geolocation-service';
import {
  openSettings,
  PERMISSIONS,
  request,
  RESULTS,
} from 'react-native-permissions';

interface SetRegionAction {
  (region: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  }): void;
}

export const requestLocationPermission = async (setRegion: SetRegionAction) => {
  try {
    const permission =
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

    const result = await request(permission);
    if (result === RESULTS.GRANTED) {
      Geolocation.getCurrentPosition(
        position => {
          const region = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          };
          setRegion(region); // Use the passed Redux function here
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
