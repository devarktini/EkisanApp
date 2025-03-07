#!/bin/bash

# Exit script on error
set -e

echo "📦 Installing dependencies..."
npm install

echo "🚀 Building APK using Expo..."
npx expo prebuild
npx expo run:android --variant release

echo "✅ APK build process completed!"
echo "🔍 You can find the APK in android/app/build/outputs/apk/release/"
