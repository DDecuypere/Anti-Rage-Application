import React from 'react';
import { Switch} from 'react-native';

const CustomSwitch = ({value, onValueChange}) => {
    return (
        <Switch
            value={value}
            onValueChange={onValueChange}
            trackColor={{false: '#c43737', true: '#4d68f0'}}
            thumbColor={value ? '#4d68f0' : '#c43737'}
        />
    );
}

export default CustomSwitch