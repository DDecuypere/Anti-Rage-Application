import React from 'react';
import { Text, View, SafeAreaView } from 'react-native';

import { FontAwesome } from '@expo/vector-icons';
import Gif from 'react-native-gif';
import { defaultStyles, darkModeStyles } from '../styles/defaultStyles';
import { statsStyles } from '../styles/statsStyles';

import { useUser} from '../providers/userProvider'; 

export default function Stats() {
  const {userData, userSettings, isLoggedIn} = useUser();
  
  return (
    <SafeAreaView style={isLoggedIn && [defaultStyles.container, userSettings.darkMode && darkModeStyles.darkContainer]}>
      {isLoggedIn && (
        <>
          <View style={statsStyles.content}>
            <View style={statsStyles.gifContainer}>
              <Gif
                style={{ width: 100, height: 100 }}
                source={require('../assests/trophy.gif')}
                resizeMode="cover"
              />
            </View>

            {JSON.parse(userData).length > 0 ? (
              <View style={[statsStyles.square, userSettings.darkMode && statsStyles.darkSquare]}>
              {JSON.parse(userData).map(([key, value], index) => (
                <View key={index} style={statsStyles.words}>
                  <View style={statsStyles.place}>
                    <FontAwesome name='trophy' color="white" size={15} />
                    <Text style={[statsStyles.text, statsStyles.word]}>{key}</Text>
                  </View>

                  <Text style={statsStyles.text}>{value}</Text>
                </View>
              ))}
              </View>
            ) : (
              <View style={statsStyles.message}>
                <Text style={[statsStyles.noStatsText, userSettings.darkMode && darkModeStyles.darkText]}>Not raged yet!</Text>
              </View>
            )}
          </View>
        </>
      )}
    </SafeAreaView>
  );
}
