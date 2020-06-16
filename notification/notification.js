import { AsyncStorage } from 'react-native';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions'; 
import Constants from 'expo-constants';

const NOTIFICATION_KEY = 'FlashCard:notifications';

export const clearLocalNotification = async () => {
  try {
    await AsyncStorage.removeItem(NOTIFICATION_KEY);
    await Notifications.cancelAllScheduledNotificationsAsync();
  } catch (error) {
    console.log(error);
  }
};

export const setLocalNotification = async () => {
  if (Constants.isDevice) {
    try {
      const result = await AsyncStorage.getItem(NOTIFICATION_KEY);
      const data = JSON.parse(result);
      if (data === null) {
        const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        let finalStatus = existingStatus;
  
        // only ask if permissions have not already been determined, because
        // iOS won't necessarily prompt the user a second time.
        if (existingStatus !== 'granted') {
          // Android remote notification permissions are granted during the app
          // install, so this will only ask on iOS
          const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
          finalStatus = status;
        }
  
        // const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  
        if (finalStatus === 'granted') {
          console.log(finalStatus)
          // await Notifications.cancelAllScheduledNotificationsAsync();
          // token = await Notifications.getExpoPushTokenAsync();
          // console.log(token);
          const notification = {
            title: 'FlashCard',
            body: "Don't forget to spend study today",
            ios: {
              sound: true,
            },
            android: {
              sound: true,
              priority: 'high',
              sticky: false,
              vibrate: true,
            },
          };
          let tomorrow = new Date();
          tomorrow.setDate(tomorrow.getDate() + 1);
          tomorrow.setHours(20);
          tomorrow.setMinutes(0);
          const options = {
            time: tomorrow,
            repeat: 'day',
          };
          await Notifications.scheduleLocalNotificationAsync(notification, options);
  
          await AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
        }
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    alert('Must use physical device for Push Notifications');
  }
  
};

