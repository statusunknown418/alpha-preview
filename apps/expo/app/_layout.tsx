import { ClerkProvider } from "@clerk/clerk-expo";
import Constants from "expo-constants";
import { Stack } from "expo-router";
import { tokenCache } from "../src/utils/cache";
import { TRPCProvider } from "../src/utils/trpc";

export default function Layout() {
  return (
    <ClerkProvider
      publishableKey={Constants.expoConfig?.extra?.CLERK_PUBLISHABLE_KEY}
      tokenCache={tokenCache}
    >
      <TRPCProvider>
        <Stack />
      </TRPCProvider>
    </ClerkProvider>
  );
}
