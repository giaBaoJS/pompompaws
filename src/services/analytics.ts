import { analytics } from './firebase';
import { logEvent, setUserId, setUserProperties } from 'firebase/analytics';
import { Platform } from 'react-native';

export interface AnalyticsEvent {
  name: string;
  parameters?: { [key: string]: any };
}

class AnalyticsService {
  private isInitialized = false;

  constructor() {
    this.isInitialized = Platform.OS === 'web' && analytics !== null;
  }

  // Log custom events
  logEvent(eventName: string, parameters?: { [key: string]: any }) {
    if (!this.isInitialized || !analytics) {
      console.log('Analytics not available:', { eventName, parameters });
      return;
    }

    try {
      logEvent(analytics, eventName, parameters);
      console.log('Analytics event logged:', { eventName, parameters });
    } catch (error) {
      console.error('Error logging analytics event:', error);
    }
  }

  // Set user ID
  setUserId(userId: string) {
    if (!this.isInitialized || !analytics) {
      console.log('Analytics not available for setUserId:', userId);
      return;
    }

    try {
      setUserId(analytics, userId);
      console.log('Analytics user ID set:', userId);
    } catch (error) {
      console.error('Error setting analytics user ID:', error);
    }
  }

  // Set user properties
  setUserProperties(properties: { [key: string]: any }) {
    if (!this.isInitialized || !analytics) {
      console.log('Analytics not available for setUserProperties:', properties);
      return;
    }

    try {
      setUserProperties(analytics, properties);
      console.log('Analytics user properties set:', properties);
    } catch (error) {
      console.error('Error setting analytics user properties:', error);
    }
  }

  // Common event helpers
  logScreenView(screenName: string, screenClass?: string) {
    this.logEvent('screen_view', {
      screen_name: screenName,
      screen_class: screenClass || screenName,
    });
  }

  logLogin(method: string) {
    this.logEvent('login', { method });
  }

  logSignUp(method: string) {
    this.logEvent('sign_up', { method });
  }

  logPurchase(transactionId: string, value: number, currency: string = 'USD') {
    this.logEvent('purchase', {
      transaction_id: transactionId,
      value,
      currency,
    });
  }

  logShare(contentType: string, itemId: string) {
    this.logEvent('share', {
      content_type: contentType,
      item_id: itemId,
    });
  }

  logSearch(searchTerm: string) {
    this.logEvent('search', {
      search_term: searchTerm,
    });
  }

  // App-specific events
  logAppOpen() {
    this.logEvent('app_open');
  }

  logButtonClick(buttonName: string, location?: string) {
    this.logEvent('button_click', {
      button_name: buttonName,
      location,
    });
  }

  logFeatureUsed(featureName: string, details?: { [key: string]: any }) {
    this.logEvent('feature_used', {
      feature_name: featureName,
      ...details,
    });
  }
}

export default new AnalyticsService(); 