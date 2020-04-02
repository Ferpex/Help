import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const AppStack = createStackNavigator();

import App from './pages/App';
import Chat from './pages/Chat';

export default function Routes() {
  return (
    <NavigationContainer>
        <AppStack.Navigator>
            <AppStack.Screen name="Ajuda" component={ App }/>
            <AppStack.Screen name="Chat" component={ Chat }/>
        </AppStack.Navigator>
    </NavigationContainer>
  );
}