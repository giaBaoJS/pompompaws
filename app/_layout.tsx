import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import NotificationService from '../src/services/notifications';
import AnalyticsService from '../src/services/analytics';

export default function RootLayout() {
  useEffect(() => {
    // Initialize services
    const initializeApp = async () => {
      // Register for push notifications
      await NotificationService.registerForPushNotificationsAsync();
      
      // Set up notification listeners
      const listeners = NotificationService.setupNotificationListeners();
      
      // Log app open event
      AnalyticsService.logAppOpen();
      
      // Cleanup function
      return () => {
        NotificationService.removeNotificationListeners(listeners);
      };
    };

    initializeApp();
  }, []);

  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="index" 
          options={{ 
            title: 'Home',
            headerShown: true 
          }} 
        />
        <Stack.Screen 
          name="about" 
          options={{ 
            title: 'About',
            presentation: 'modal' 
          }} 
        />
      </Stack>
      <StatusBar style="light" />
    </SafeAreaProvider>
  );
} 