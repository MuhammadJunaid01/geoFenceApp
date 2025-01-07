import React, {useCallback, useState} from 'react';
import {Text, View} from 'react-native';
import MapView, {MapPressEvent, Polygon, Region} from 'react-native-maps';
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
    <View>
      <Text>mapComponent</Text>
    </View>
  );
};

export default MapComponent;
