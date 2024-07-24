import { Slider } from '@react-native-assets/slider';
import React from 'react';
import { StyleSheet} from 'react-native';

const CustomSlider = ({minimumValue, maximumValue, value, step, onValueChange}) => {
    return (
        <Slider
            style={styles.slider}
            minimumValue={minimumValue}
            maximumValue={maximumValue}
            value={value}
            step={step}
            thumbTintColor='#4d68f0'
            onValueChange={onValueChange}
            minimumTrackTintColor="#4d68f0"
            maximumTrackTintColor="#8f919c"
        />
    );
}

const styles= StyleSheet.create({
    slider: {
        width: 200,
        height: 80
    },
})

export default CustomSlider