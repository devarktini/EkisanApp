#!/bin/bash

# Exit script on error
set -e

echo "📦 Installing dependencies..."
npm install --force

echo "🚀 Building APK using Expo..."
npx expo prebuild
npx expo run:android --variant release

echo "✅ APK build process completed!"
echo "🔍 You can find the APK in android/app/build/outputs/apk/release/"


#!/bin/bash

# Exit script on error
# set -e

# echo "📦 Installing dependencies..."
# npm install

# echo "🔨 Installing expo-dev-client..."
# npx expo install expo-dev-client

# echo "🚀 Building Development Build for Android..."
# npx expo prebuild
# npx expo run:android

# echo "✅ Development build process completed!"
# echo "🔍 You can now run the app on your connected Android device."

