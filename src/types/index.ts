// Navigation types
export type RootStackParamList = {
  index: undefined;
  about: undefined;
};

// Firebase types
export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId?: string;
}

// Notification types
export interface PushNotificationData {
  title: string;
  body: string;
  data?: Record<string, any>;
}

export interface NotificationResponse {
  notification: {
    request: {
      content: PushNotificationData;
    };
  };
  actionIdentifier: string;
}

// Analytics types
export interface AnalyticsEventParams {
  [key: string]: string | number | boolean;
}

export interface UserProperties {
  [key: string]: string | number | boolean;
}

// App types
export interface AppConfig {
  firebase: FirebaseConfig;
  notifications: {
    enabled: boolean;
    channels: string[];
  };
  analytics: {
    enabled: boolean;
    debugMode: boolean;
  };
} 