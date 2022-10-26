import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HistoryView from './src/historyView';

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="ConverterView" component={ConverterView} />
        <Stack.Screen name="HistoryView" component={HistoryView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};