import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {View} from 'react-native';
import tw from '../../tailwind';
import {Home} from '../components';
import {RootStackParamList} from '../interfaces/navigation.interface';
type Props = StackScreenProps<RootStackParamList, 'Home'>;
const HomeScreen: React.FC<Props> = () => {
  return (
    <View style={tw` flex-1 bg-white`}>
      <Home />
    </View>
  );
};

export default HomeScreen;
