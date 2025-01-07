import React, {useCallback} from 'react';
import {View} from 'react-native';
import tw from '../../tailwind';
import {MapComponent} from '../components';
import {Fence} from '../interfaces/shared';
import {addGeoFence} from '../redux/features/geoFenceSlice';
import {useAppDispatch} from '../redux/hooks';

const MapScreen = () => {
  const dispatch = useAppDispatch();
  const onSaveFence = useCallback(
    (fence: Fence) => {
      console.log('fence', fence);
      dispatch(addGeoFence(fence));
    },
    [dispatch],
  );
  return (
    <View style={tw` flex-1`}>
      <MapComponent onSaveFence={onSaveFence} />
    </View>
  );
};

export default MapScreen;
