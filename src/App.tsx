import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import AppNavigator from './presentation/navigation';

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};

export default App;
