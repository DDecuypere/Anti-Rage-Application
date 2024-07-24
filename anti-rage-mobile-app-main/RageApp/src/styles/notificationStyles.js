import { StyleSheet } from 'react-native';

export const notificationStyles = StyleSheet.create({
    allNotifications: {
        margin: 10
    },
    notification: {
        backgroundColor: '#4d68f0',
        padding: 20,
        marginTop: 10,
        borderRadius: 50,
        flexDirection: 'row',
        alignItems: 'center'
    },
    description: {
        color: 'white',
        marginLeft: 20
    },
    none: {
        alignItems: 'center'
    },
    noneText: {
        marginTop: '50%',
        fontSize: 24
    },
    darkNoneText: {
        color: 'white'
    }
});