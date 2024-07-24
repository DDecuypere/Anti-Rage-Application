import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginStack from './src/routes/loginStack';
import HomeStack from './src/routes/homeStack';

import { UserProvider, useUser } from './src/providers/userProvider';

const Stack = createStackNavigator();

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <AppNavigator/>
      </NavigationContainer>
    </UserProvider>
  );
}

const AppNavigator = () => {
  const { isLoggedIn } = useUser();

  return (
    <Stack.Navigator>
      {isLoggedIn ? (
              <Stack.Screen name='HomeStack' component={HomeStack} options={{ headerShown: false }}/>
          ) : (
              <Stack.Screen name='LoginStack' component={LoginStack} options={{ headerShown: false }}/>
        )}
    </Stack.Navigator>
  );
};
