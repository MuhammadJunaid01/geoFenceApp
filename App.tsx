/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {View} from 'react-native';

import 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen';
import Toast from 'react-native-toast-message';
import {Provider} from 'react-redux';
import {RootStack} from './src/navigation';
import store from './src/redux/store';
import {toastConfig} from './src/utils/showToast';
import tw from './tailwind';
function App(): React.JSX.Element {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <View style={tw` flex-1`}>
      <Provider store={store}>
        <GestureHandlerRootView style={tw` flex-1`}>
          <RootStack />
          {/* Configure Toast message */}
          <Toast config={toastConfig} />
        </GestureHandlerRootView>
      </Provider>
    </View>
  );
}

export default App;
