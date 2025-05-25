# PomPomPaws Setup Guide 🐾

## 🚀 Quick Start

Your Expo app is now configured with:
- ✅ Expo Router (File-based routing)
- ✅ TypeScript
- ✅ Firebase SDK
- ✅ Expo Notifications
- ✅ Firebase Analytics

## 🔧 Firebase Setup

### 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter project name: `pompompaws`
4. Enable Google Analytics (recommended)
5. Choose or create Analytics account

### 2. Add Apps to Firebase Project

#### For Web App:
1. Click "Add app" → Web (</>) icon
2. App nickname: `PomPomPaws Web`
3. Enable Firebase Hosting (optional)
4. Copy the config object

#### For iOS App:
1. Click "Add app" → iOS icon
2. Bundle ID: `com.pompompaws.app`
3. Download `GoogleService-Info.plist`

#### For Android App:
1. Click "Add app" → Android icon
2. Package name: `com.pompompaws.app`
3. Download `google-services.json`

### 3. Configure Firebase Services

#### Enable Analytics:
1. Go to Analytics → Dashboard
2. Analytics should be automatically enabled

#### Enable Cloud Messaging:
1. Go to Cloud Messaging
2. No additional setup needed for basic notifications

### 4. Update App Configuration

#### Update Firebase Config:
Edit `src/services/firebase.ts` with your Firebase config:

```typescript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-actual-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-actual-app-id",
  measurementId: "G-XXXXXXXXXX"
};
```

#### Add Google Services Files:
- Place `google-services.json` in the root directory (for Android)
- Place `GoogleService-Info.plist` in the root directory (for iOS)

## 📱 EAS Setup (for Push Notifications)

### 1. Install EAS CLI
```bash
npm install -g @expo/eas-cli
```

### 2. Login to EAS
```bash
eas login
```

### 3. Create EAS Project
```bash
eas project:init
```

### 4. Update app.json
Replace `"your-project-id-here"` in `app.json` with your actual EAS project ID.

## 🔔 Testing Notifications

### Local Notifications:
1. Run the app: `npm start`
2. Open on device/simulator
3. Tap "Test Local Notification"
4. Notification appears after 2 seconds

### Push Notifications:
1. Complete EAS setup above
2. Build development build: `eas build --profile development`
3. Install on physical device
4. Use Expo Push Tool or your backend to send notifications

## 📊 Testing Analytics

### Development:
- Analytics events are logged to console
- Use Firebase Analytics DebugView for real-time testing

### Production:
- Events appear in Firebase Analytics dashboard
- May take 24-48 hours for initial data

## 🛠️ Development Commands

```bash
# Start development server
npm start

# Start with specific platform
npm run ios
npm run android
npm run web

# Type checking
npx tsc --noEmit

# Build for production
eas build --platform all
```

## 📁 Project Structure

```
pompompaws/
├── app/                    # Expo Router pages
│   ├── _layout.tsx        # Root layout
│   ├── index.tsx          # Home screen
│   └── about.tsx          # About screen
├── src/
│   ├── components/        # Reusable components
│   ├── services/          # Firebase & other services
│   │   ├── firebase.ts    # Firebase configuration
│   │   ├── notifications.ts # Notification service
│   │   └── analytics.ts   # Analytics service
│   ├── types/             # TypeScript types
│   └── utils/             # Utility functions
├── assets/                # Images, fonts, etc.
├── app.json              # Expo configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Dependencies
```

## 🔍 Troubleshooting

### Notifications Not Working:
1. Ensure you're testing on a physical device
2. Check notification permissions
3. Verify EAS project ID is correct
4. Check console for error messages

### Analytics Not Logging:
1. Verify Firebase config is correct
2. Check console for Firebase initialization errors
3. Analytics only works on web in development
4. Use Firebase DebugView for testing

### TypeScript Errors:
1. Run `npx tsc --noEmit` to check for errors
2. Ensure all imports are correct
3. Check that types are properly exported

## 📚 Next Steps

1. **Customize UI**: Update colors, fonts, and styling
2. **Add Authentication**: Implement Firebase Auth
3. **Add Database**: Use Firestore for data storage
4. **Add More Screens**: Expand your app's functionality
5. **Deploy**: Build and submit to app stores

## 🆘 Need Help?

- [Expo Documentation](https://docs.expo.dev/)
- [Firebase Documentation](https://firebase.google.com/docs)
- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

Happy coding! 🎉 