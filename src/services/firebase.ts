import { initializeApp, getApps } from 'firebase/app';
import { getAnalytics, Analytics } from 'firebase/analytics';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { Platform } from 'react-native';

// Your Firebase config object
// Replace with your actual Firebase config from Firebase Console
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id",
  measurementId: "your-measurement-id"
};

// Initialize Firebase
let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

// Initialize Analytics (only for web)
let analytics: Analytics | null = null;
if (Platform.OS === 'web') {
  analytics = getAnalytics(app);
}

// Initialize Messaging (only for web)
let messaging = null;
if (Platform.OS === 'web') {
  messaging = getMessaging(app);
}

export { app, analytics, messaging };
export default app; 