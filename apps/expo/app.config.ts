import { ConfigContext, ExpoConfig } from "@expo/config";

const CLERK_PUBLISHABLE_KEY =
  "pk_test_dXNlZnVsLXdoaXBwZXQtOS5jbGVyay5hY2NvdW50cy5kZXYk";

const defineConfig = (_ctx: ConfigContext): ExpoConfig => ({
  name: "houn-preview",
  slug: "houn-preview",
  version: "1.0.0",
  orientation: "portrait",
  owner: "alvarodev995",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  // TODO: This should be the same as package and bundle id in production!!!!!
  scheme: "preview-app",
  splash: {
    image: "./assets/icon.png",
    resizeMode: "contain",
    backgroundColor: "#2e026d",
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
    // TODO: Update this on production
    bundleIdentifier: "com.houn.preview",
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/icon.png",
      backgroundColor: "#2e026d",
    },
    package: "com.houn.preview",
    versionCode: 1,
  },
  extra: {
    eas: {
      projectId: "9afad322-aebd-4ad7-98bf-666a1ae5f1fb",
    },
    CLERK_PUBLISHABLE_KEY,
  },
  plugins: ["./expo-plugins/with-modify-gradle.js"],
});

export default defineConfig;
