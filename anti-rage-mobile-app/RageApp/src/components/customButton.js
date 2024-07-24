import React from 'react';
import { Text, Pressable} from 'react-native';
import { buttonStyles } from '../styles/buttonStyles';

const CustomButton = ({onPress, text, type = 'PRIMARY'}) => {
    return (
        <Pressable onPress={onPress} style={[buttonStyles.container, buttonStyles[`container_${type}`]]}>
            <Text style={[buttonStyles.text, buttonStyles[`text_${type}`]]}>{text}</Text>
        </Pressable>
    );
}
export default CustomButton