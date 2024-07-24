import React from 'react';
import { View, TextInput } from 'react-native';
import { inputStyles } from '../styles/inputStyles';

const CustomInput = ({value, setValue, placeholder, secureTextEntry}) => {
    return (
        <View style={inputStyles.container}>
            <TextInput 
            value={value}
            onChangeText={setValue}
            placeholder= {placeholder}
            secureTextEntry= {secureTextEntry}
            style={inputStyles.input}
            />
        </View>
    );
}

export default CustomInput