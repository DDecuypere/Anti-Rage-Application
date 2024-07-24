import React, { useState, useEffect } from 'react';
import { View, KeyboardAvoidingView } from 'react-native';
import { defaultStyles } from '../styles/defaultStyles';
import { loginStyles } from '../styles/loginStyles';

import CustomInput from '../components/customInput';
import CustomButton from '../components/customButton';

import { useUser } from '../providers/userProvider';

import * as LocalAuthentication from 'expo-local-authentication';

function Login({navigation}) {
    //on input, change the values 
    const [username, setUsername] = useState('');
    const {loginProcess, isLoggedIn} = useUser();
    const [biometricAvailable, setBiometricAvailable] = useState(false);
    
    useEffect(() => {
      checkAvailability();
    }, []);

    //set user with username
    const usernameLogin = async() => {
        if (username) {
            await loginProcess(username);
            if (isLoggedIn){
              console.log(isLoggedIn);
              navigation.navigate('HomeStack');
            }  
        }
        else {
          alert('No username entered!');
        }
      }

    const noUsernameLogin = async() => {
        await loginProcess();
        if (isLoggedIn){
          navigation.navigate('HomeStack');
        } 
    }

    const checkAvailability = async () => {
      const isAvailable = await LocalAuthentication.hasHardwareAsync();
      setBiometricAvailable(isAvailable);
    }

    const getBiometricAuth = async() => {
      try {
        const result = await LocalAuthentication.authenticateAsync();
        if (result.success) {
          noUsernameLogin();
        } 
      } catch (error) {
        console.error('Authentication error:', error);
      }
    }

    return (
        <KeyboardAvoidingView style={defaultStyles.container}>
            <View style={loginStyles.form}>
              <CustomInput placeholder='Choose username' value={username} setValue={setUsername}/>
              <View style={loginStyles.buttons}>
                <CustomButton text={'set username'} onPress={usernameLogin}/>
                <CustomButton text={'Continue without username'} onPress={noUsernameLogin}/>
                {biometricAvailable && (
                <CustomButton text={'Fingerprint'} type='TERTIARY' onPress={getBiometricAuth}/>
                )}
              </View>
            </View>
        </KeyboardAvoidingView>
    );
}

export default Login