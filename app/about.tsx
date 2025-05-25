import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import AnalyticsService from '../src/services/analytics';

export default function AboutScreen() {
  useEffect(() => {
    // Log screen view
    AnalyticsService.logScreenView('About', 'AboutScreen');
  }, []);

  const handleGoBack = () => {
    AnalyticsService.logButtonClick('go_back', 'about_screen');
    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>About PomPomPaws 🐾</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🚀 Tech Stack</Text>
          <Text style={styles.item}>• Expo SDK 53 (Latest)</Text>
          <Text style={styles.item}>• React Native 0.79.2</Text>
          <Text style={styles.item}>• TypeScript</Text>
          <Text style={styles.item}>• Expo Router (File-based routing)</Text>
          <Text style={styles.item}>• Firebase (Analytics & Notifications)</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📱 Features</Text>
          <Text style={styles.item}>• Push Notifications</Text>
          <Text style={styles.item}>• Analytics Tracking</Text>
          <Text style={styles.item}>• Type-safe Navigation</Text>
          <Text style={styles.item}>• Modern UI Components</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔧 Next Steps</Text>
          <Text style={styles.item}>1. Configure Firebase project</Text>
          <Text style={styles.item}>2. Add your Firebase config</Text>
          <Text style={styles.item}>3. Set up EAS project ID</Text>
          <Text style={styles.item}>4. Build your amazing app!</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleGoBack}>
          <Text style={styles.buttonText}>← Go Back</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    marginBottom: 30,
    color: '#333',
  },
  section: {
    marginBottom: 25,
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
  item: {
    fontSize: 16,
    marginBottom: 8,
    color: '#555',
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#f4511e',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
}); 