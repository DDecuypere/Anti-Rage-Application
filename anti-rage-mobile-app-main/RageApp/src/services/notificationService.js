import { ToastAndroid } from 'react-native'
import { fetchNotifications } from "../api/api";
import AsyncStorage from '@react-native-async-storage/async-storage';

const POLLING_INTERVAL = 5000;

let notificationInterval;

//show notification when there is data
const startFetchingAndNotify = async () => {
  try {
    const data = await fetchNotifications();
    if (data) {
      showNotification();
      await updateNotificationCount();
    }
  } catch (error) {
    console.error('Error fetching and notifying:', error);
  }
};

//get storage notification amount
export const getNotifications = async() => {
  return await AsyncStorage.getItem('notifications');
}

//set amount of notifications to storage 
const updateNotificationCount = async() => {
  try {
    const currentCount = await AsyncStorage.getItem('notifications');
    const newCount = (parseInt(currentCount, 10) || 0) + 1;
    await AsyncStorage.setItem('notifications', newCount.toString());
  } catch (error) {
    console.error('Error updating notification count:', error);
  }
}

export const startContinuousFetchingNotifications = () => {
  // Start fetching data at regular intervals
  notificationInterval = setInterval(startFetchingAndNotify, POLLING_INTERVAL);
};

export const stopContinuousFetchingNotifications = () => {
  // Stop fetching when it's no longer needed
  clearInterval(notificationInterval);
};

const showNotification = () => {
  ToastAndroid.show(
    `Don't break your keyboard!`,
    ToastAndroid.LONG,
    ToastAndroid.TOP,
  );
};

