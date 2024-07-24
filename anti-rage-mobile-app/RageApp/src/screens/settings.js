import React, { useState, useEffect } from 'react';
import { Text, View, SafeAreaView } from 'react-native';
import { defaultStyles, darkModeStyles } from '../styles/defaultStyles';
import { settingsStyles } from '../styles/settingStyles';

import CustomButton from '../components/customButton';
import CustomSlider from '../components/customSlider';
import CustomSwitch from '../components/customSwitch';

import { useUser } from '../providers/userProvider'; 

export default function Settings() {
    const {userSettings, setSettings} = useUser();
    const [isChecked, setIsChecked] = useState(false);
    const [changeVelo, setChangeVelo] = useState(0);
    const [changePress, setChangePress] = useState(0);

    const stylesDefault = isChecked ? { ...defaultStyles, ...darkModeStyles } : defaultStyles;

    useEffect(() => {
        const loadSettings = async () => {
            try {
                setIsChecked(userSettings.darkMode);
                setChangeVelo(userSettings.maxVelocity);
                setChangePress(userSettings.maxPpt);
            } catch (error) {
                console.error('Error loading settings', error);
            }
        }
        loadSettings();
      }, [userSettings.darkMode, userSettings.maxVelocity, userSettings.maxPpt]);

    const handleSettingsChange = () => {
        setSettings(isChecked, changeVelo, changePress);
      };

    const handlePpt = (value) => {
        setChangePress(value);
    };

    const handleVelo = (value) => {
        setChangeVelo(value);
    };

    const handleSwitch = () => {
        setIsChecked(!isChecked)
    }

    return (
        <SafeAreaView style={[stylesDefault.container, stylesDefault.darkContainer]}>
            <View style={settingsStyles.dark}>
                <Text style={settingsStyles.darkModetext}>Darkmode</Text>
                <CustomSwitch
                value={isChecked}
                onValueChange={handleSwitch}
                />
            </View>

            <View style={settingsStyles.settingsContainer}>
                <View style={settingsStyles.settings}>
                    <Text style={stylesDefault.darkText}>Velocity</Text>
                    <CustomSlider
                    minimumValue={1}
                    maximumValue={6}
                    value={changeVelo}
                    step={1}
                    onValueChange={handleVelo}
                    />
                    <Text style={stylesDefault.darkText}>Presses</Text>
                    <CustomSlider
                    minimumValue={10}
                    maximumValue={100}
                    value={changePress}
                    step={10}
                    onValueChange={handlePpt}
                    />
                </View>
                <CustomButton text={'Apply'} onPress={handleSettingsChange}/>
            </View>
        </SafeAreaView>
    );
}