/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView} from 'react-native';

import 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {RootStack} from './src/navigation';
import store from './src/redux/store';
import tw from './tailwind';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={tw` flex-1`}>
      <Provider store={store}>
        <GestureHandlerRootView style={tw` flex-1`}>
          <RootStack />
        </GestureHandlerRootView>
      </Provider>
    </SafeAreaView>
  );
}

export default App;
