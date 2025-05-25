import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import NotificationService from '../src/services/notifications';
import AnalyticsService from '../src/services/analytics';

export default function HomeScreen() {
  const handleTestNotification = async () => {
    AnalyticsService.logButtonClick('test_notification', 'home_screen');
    
    await NotificationService.scheduleLocalNotification({
      title: 'Test Notification',
      body: 'This is a test notification from PomPomPaws!',
      data: { screen: 'home' },
    }, 2);
  };

  const handleAnalyticsTest = () => {
    AnalyticsService.logFeatureUsed('analytics_test', {
      timestamp: new Date().toISOString(),
      user_action: 'button_press',
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to PomPomPaws! 🐾</Text>
        <Text style={styles.subtitle}>
          Your app is set up with Expo Router, TypeScript, and Firebase!
        </Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔔 Notifications</Text>
          <TouchableOpacity style={styles.button} onPress={handleTestNotification}>
            <Text style={styles.buttonText}>Test Local Notification</Text>
          </TouchableOpacity>
          <Text style={styles.info}>
            Push token: {NotificationService.getExpoPushToken() || 'Not available'}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📊 Analytics</Text>
          <TouchableOpacity style={styles.button} onPress={handleAnalyticsTest}>
            <Text style={styles.buttonText}>Log Analytics Event</Text>
          </TouchableOpacity>
          <Text style={styles.info}>
            Check console for analytics events
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🧭 Navigation</Text>
          <Link href="/about" asChild>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Go to About Screen</Text>
            </TouchableOpacity>
          </Link>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🛠️ Setup Status</Text>
          <Text style={styles.statusItem}>✅ Expo Router</Text>
          <Text style={styles.statusItem}>✅ TypeScript</Text>
          <Text style={styles.statusItem}>✅ Firebase SDK</Text>
          <Text style={styles.statusItem}>✅ Expo Notifications</Text>
          <Text style={styles.statusItem}>⚠️ Firebase Config (needs setup)</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
    lineHeight: 24,
  },
  section: {
    marginBottom: 30,
    padding: 20,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  button: {
    backgroundColor: '#f4511e',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  info: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
    fontStyle: 'italic',
  },
  statusItem: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
}); 