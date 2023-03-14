import { ClerkProvider } from "@clerk/clerk-expo";
import Constants from "expo-constants";
import React from "react";
import { MainNavigationContainer } from "./navigation/StackNavigator";
import { tokenCache } from "./utils/cache";
import { TRPCProvider } from "./utils/trpc";

export const App = () => {
  return (
    <ClerkProvider
      publishableKey={Constants.expoConfig?.extra?.CLERK_PUBLISHABLE_KEY}
      tokenCache={tokenCache}
    >
      <TRPCProvider>
        <MainNavigationContainer />
      </TRPCProvider>
    </ClerkProvider>
  );
};
