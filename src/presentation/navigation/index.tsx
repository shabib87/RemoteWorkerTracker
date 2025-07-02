import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {RootStackParamList} from '../../shared/types';
import HomeScreen from '../screens/home/HomeScreen';
import WorkerDetailScreen from '../screens/worker-details/WorkerDetailScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{title: 'Workers'}}
      />
      <Stack.Screen
        name="WorkerDetail"
        component={WorkerDetailScreen}
        options={{title: 'Worker Details'}}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
