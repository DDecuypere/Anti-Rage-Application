import { StyleSheet } from 'react-native';

export const settingsStyles = StyleSheet.create({
    dark: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#8f919c',
        width: '95%',
        padding: 20,
        margin: 10,
        borderRadius: 10,
    },
    settingsContainer: {
        marginTop: 30,
        padding: 24
    },
    settings: {
        marginBottom: 30
    },
    darkModetext: {
        color: 'white'
    }
});