import React, {useCallback} from 'react';
import {View} from 'react-native';
import tw from '../../tailwind';
import MapComponent from '../components/MapComponent';
import {Fence} from '../interfaces/shared';

const MapScreen = () => {
  const onSaveFence = useCallback((fence: Fence) => {
    console.log('fence', fence);
  }, []);
  return (
    <View style={tw` flex-1`}>
      <MapComponent onSaveFence={onSaveFence} />
    </View>
  );
};

export default MapScreen;
