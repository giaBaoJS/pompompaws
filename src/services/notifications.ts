import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform, Alert } from 'react-native';
import Constants from 'expo-constants';

// Configure notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export interface NotificationData {
  title: string;
  body: string;
  data?: any;
}

class NotificationService {
  private expoPushToken: string | null = null;

  async registerForPushNotificationsAsync(): Promise<string | null> {
    let token = null;

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      
      if (finalStatus !== 'granted') {
        Alert.alert('Error', 'Failed to get push token for push notification!');
        return null;
      }
      
      try {
        const projectId = Constants.expoConfig?.extra?.eas?.projectId ?? Constants.easConfig?.projectId;
        if (!projectId) {
          throw new Error('Project ID not found');
        }
        
        token = (await Notifications.getExpoPushTokenAsync({
          projectId,
        })).data;
        
        this.expoPushToken = token;
        console.log('Expo Push Token:', token);
      } catch (e) {
        console.error('Error getting push token:', e);
      }
    } else {
      Alert.alert('Error', 'Must use physical device for Push Notifications');
    }

    return token;
  }

  getExpoPushToken(): string | null {
    return this.expoPushToken;
  }

  async scheduleLocalNotification(notificationData: NotificationData, seconds: number = 1) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: notificationData.title,
        body: notificationData.body,
        data: notificationData.data,
      },
      trigger: { 
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds 
      },
    });
  }

  async cancelAllNotifications() {
    await Notifications.cancelAllScheduledNotificationsAsync();
  }

  // Set up notification listeners
  setupNotificationListeners() {
    // Handle notification received while app is foregrounded
    const notificationListener = Notifications.addNotificationReceivedListener(notification => {
      console.log('Notification received:', notification);
    });

    // Handle notification response (user tapped notification)
    const responseListener = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('Notification response:', response);
    });

    return {
      notificationListener,
      responseListener,
    };
  }

  // Clean up listeners
  removeNotificationListeners(listeners: any) {
    Notifications.removeNotificationSubscription(listeners.notificationListener);
    Notifications.removeNotificationSubscription(listeners.responseListener);
  }
}

export default new NotificationService(); 