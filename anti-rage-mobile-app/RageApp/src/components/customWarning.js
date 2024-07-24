import React from 'react';
import { Text, Modal, View} from 'react-native';
import CustomButton from './customButton';
import { warningStyles } from '../styles/warningStyles';

const CustomWarning = ({visible, onClose, message}) => {
    return (
        <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}
        >
        <View style={warningStyles.modalContainer}>
            <View style={warningStyles.modalContent}>
                <Text>{message}</Text>
                <CustomButton text={'Close'} onPress={onClose}/>
            </View>
        </View>
        </Modal>
    );
}

export default CustomWarning