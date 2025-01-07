import React, {useCallback, useState} from 'react';
import {Button, View} from 'react-native';
import MapView, {MapPressEvent, Polygon} from 'react-native-maps';
import tw from '../../tailwind';
import {Coordinate} from '../interfaces/shared';

type Fence = {
  id: number;
  coordinates: Coordinate[];
};
interface IProps {
  onSaveFence: (fence: Fence) => void;
}
interface IState {
  coordinates: Coordinate[];
  isDrawing: boolean;
}
const initialState: IState = {
  coordinates: [],
  isDrawing: false,
};
const MapComponent: React.FC<IProps> = ({onSaveFence}) => {
  const [state, setState] = useState(initialState);
  /* The `handleMapPress` function is a callback function created using the `useCallback` hook in React.
 It is triggered when a user presses on the map. */
  const handleMapPress = useCallback(
    (event: MapPressEvent) => {
      if (state.isDrawing) {
        setState(prev => ({
          ...prev,
          coordinates: [...prev.coordinates, event.nativeEvent.coordinate],
        }));
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
  }, [onSaveFence, state.coordinates]);

  return (
    <View style={tw` flex-1`}>
      <MapView
        style={tw` flex-1`}
        onPress={handleMapPress}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        {state.coordinates.length > 0 && (
          <Polygon
            coordinates={state.coordinates}
            fillColor="rgba(0, 150, 136, 0.5)"
          />
        )}
      </MapView>
      <View style={tw` absolute bottom-5    items-center`}>
        <Button
          title={state.isDrawing ? 'Stop Drawing' : 'Start Drawing'}
          onPress={() =>
            setState(prev => ({...prev, isDrawing: !state.isDrawing}))
          }
        />
        {state.coordinates.length > 0 && (
          <Button title="Save Fence" onPress={handleSave} />
        )}
      </View>
    </View>
  );
};

export default MapComponent;
