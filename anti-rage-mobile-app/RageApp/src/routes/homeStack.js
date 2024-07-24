import {createStackNavigator} from '@react-navigation/stack';

import Noti from '../screens/notifications';
import Settings from '../screens/settings';
import Stats from '../screens/stats';

import { TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import { FontAwesome } from '@expo/vector-icons';

import { useUser } from '../providers/userProvider';
import VelocityService from '../services/velocityService';
import { startContinuousFetchingNotifications, stopContinuousFetchingNotifications } from '../services/notificationService';

import AsyncStorage from '@react-native-async-storage/async-storage';

//initialize stack nav
const HomeStack = createStackNavigator();

//wrap the nav around the pages so it is used on these screens
const Screens = () => {
    const { logout, isLoggedIn, username } = useUser();

    useEffect(() => {
        //on mount of stack fetch for notifications every 5 seconds
        const receiveNotifications = async () => {
          try {
            // Start continuous fetching noti
            startContinuousFetchingNotifications();

            // Stop continuous fetching noti
            return () => {
            stopContinuousFetchingNotifications();
            };
          } catch (error) {
            console.error('Error receiving notifications:', error);
          }
        };
        receiveNotifications();
      }, []);

      const clearNotifications = async() => {
        try {
            await AsyncStorage.removeItem('notifications');
          } catch (error) {
            console.error('Error clearing notifications:', error);
          }
        }

    return (
        <>
        {isLoggedIn &&
            <VelocityService />
        }
        <HomeStack.Navigator
            screenOptions={{
                headerStyle: {
                backgroundColor: 'black', // Set the background color of the header
                },
                headerTitleStyle: {
                color: 'white', // Set the color of the header title
                },
                headerTitleAlign: 'center',
                headerTintColor: 'black'
            }}
        >
            <HomeStack.Screen 
                name={isLoggedIn ? username : 'Stats'} 
                component={Stats} 
                options={({ navigation }) => ({
                    headerLeft: () => (
                        <TouchableOpacity
                            style={{ marginLeft: 25 }}
                            onPress={() => {
                                logout();
                                if (!isLoggedIn) {
                                    navigation.navigate('LoginStack');
                                }
                            }}
                            >
                            <FontAwesome name="sign-out" size={24} color="red" />
                        </TouchableOpacity>
                      ),
                    headerRight: () => (
                        <View style={{ flexDirection: 'row', marginRight: 20 }}>
                            <TouchableOpacity
                                style={{ marginRight: 25 }}
                                onPress={() => {
                                    navigation.navigate('Notifications');
                                }}
                            >
                                <FontAwesome name="bell" size={24} color="white" />
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate('Settings');
                                }}
                            >
                                <FontAwesome name="cog" size={24} color="white" />
                            </TouchableOpacity>
                        </View>
                    )
                })}
            />
            <HomeStack.Screen 
                name='Notifications' 
                component={Noti}
                options={({ navigation }) => ({
                    headerLeft: () => (
                        <TouchableOpacity
                            style={{ marginLeft: 25 }}
                            onPress={() => {
                                navigation.navigate(username);
                            }}
                            >
                            <FontAwesome name="arrow-left" size={24} color="white" />
                        </TouchableOpacity>
                      ),
                      headerRight: () => (
                        <TouchableOpacity
                            style={{ marginRight: 25 }}
                            onPress={() => {
                                clearNotifications();
                            }}
                            >
                            <FontAwesome name="trash" size={24} color="white" />
                        </TouchableOpacity>
                    )
                })}
            />
            <HomeStack.Screen 
                name='Settings' 
                component={Settings}
                options={({ navigation }) => ({
                    headerLeft: () => (
                        <TouchableOpacity
                            style={{ marginLeft: 25 }}
                            onPress={() => {
                                navigation.navigate(username);
                            }}
                            >
                            <FontAwesome name="arrow-left" size={24} color="white" />
                        </TouchableOpacity>
                      )
                })}
            />
        </HomeStack.Navigator>
        </>
    );
};

export default Screens;