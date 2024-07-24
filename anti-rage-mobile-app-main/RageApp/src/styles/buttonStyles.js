import { StyleSheet } from 'react-native';

export const buttonStyles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 15,
        alignItems: 'center',
        borderRadius: 5,
        marginBottom: 10,
        marginTop: 10
    },
    container_PRIMARY: {
        backgroundColor: '#8f919c',
    },
    container_TERTIARY: {},
    text: {
        fontWeight: 'bold',
        color: 'white'
    },
    text_TERTIARY: {
        color: 'gray'
    }
});