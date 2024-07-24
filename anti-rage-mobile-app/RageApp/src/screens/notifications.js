import React, {useEffect, useState} from 'react';
import { Text, View, SafeAreaView, ScrollView } from 'react-native';
import { defaultStyles, darkModeStyles } from '../styles/defaultStyles';
import { notificationStyles } from '../styles/notificationStyles'
import { FontAwesome } from '@expo/vector-icons';

import { getNotifications } from '../services/notificationService';

import { useUser } from '../providers/userProvider'; 

export default function Notifications() {
    const {userSettings} = useUser();
    const [count, setCount] = useState(0);

    useEffect(() => {
       const retrieveCount = async () => {
            try {
            const notiesCount = await getNotifications();
            setCount(parseInt(notiesCount));
            } catch (error) {
            console.error('Error retrieving count:', error);
            }
        };
       retrieveCount();
    }, [count]);

    return (
        <SafeAreaView style={[defaultStyles.container, userSettings.darkMode && darkModeStyles.darkContainer]}>
            <ScrollView>
            {count ? (
                <View style={notificationStyles.allNotifications}>
                    {Array.from({ length: count }).map((_, index) => (
                        <View style={notificationStyles.notification} key={index}>
                            <FontAwesome name="bell" size={20} color="white" />
                            <Text style={notificationStyles.description}>Don't break your keyboard!</Text>
                        </View>
                    ))}
                </View>
            ) : (
                <View style={notificationStyles.none}>
                    <Text style={[notificationStyles.noneText, userSettings.darkMode && notificationStyles.darkNoneText]}>No recent Notifications</Text>
                </View>
            )}
            </ScrollView>
        </SafeAreaView>
    );
}