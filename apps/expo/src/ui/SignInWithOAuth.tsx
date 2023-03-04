import { useAuth, useSignIn, useSignUp } from "@clerk/clerk-expo";
import React, { useState } from "react";
import { Button, TextInput, View } from "react-native";

import * as AuthSession from "expo-auth-session";

export const SignInWithOAuth = () => {
  const { isLoaded, signIn, setSession } = useSignIn();

  const { signUp, isLoaded: isSignUpLoaded } = useSignUp();

  const { signOut } = useAuth();

  const [code, setCode] = useState<string>("");

  if (!isLoaded) return null;

  const handleSignInWithGooglePress = async () => {
    try {
      const redirectUrl = AuthSession.makeRedirectUri({
        path: "/oauth-native-callback",
      });

      await signIn.create({
        strategy: "oauth_google",
        redirectUrl,
      });

      const {
        firstFactorVerification: { externalVerificationRedirectURL },
      } = signIn;

      if (!externalVerificationRedirectURL)
        throw "Something went wrong during the OAuth flow. Try again.";

      const authResult = await AuthSession.startAsync({
        authUrl: externalVerificationRedirectURL.toString(),
        returnUrl: redirectUrl,
      });

      if (authResult.type !== "success") {
        throw "Something went wrong during the OAuth flow. Try again.";
      }

      // Get the rotatingTokenNonce from the redirect URL parameters
      const { rotating_token_nonce: rotatingTokenNonce } = authResult.params;

      await signIn.reload({ rotatingTokenNonce });

      const { createdSessionId } = signIn;

      if (createdSessionId) {
        // If we have a createdSessionId, then auth was successful
        await setSession(createdSessionId);
      } else {
        // If we have no createdSessionId, then this is a first time sign-in, so
        // we should process this as a signUp instead
        // Throw if we're not in the right state for creating a new user
        if (
          !signUp ||
          signIn.firstFactorVerification.status !== "transferable"
        ) {
          throw "Something went wrong during the Sign up OAuth flow. Please ensure that all sign up requirements are met.";
        }

        // Create user
        await signUp.create({ transfer: true });
        await signUp.reload({
          rotatingTokenNonce: authResult.params.rotating_token_nonce,
        });
        await setSession(signUp.createdSessionId);
      }
    } catch (err) {
      throw new Error("Error signing in");
    }
  };

  const handleSignInWithPhone = async () => {
    try {
      if (!signUp || !isSignUpLoaded) {
        throw "Something went wrong during the Sign up OAuth flow. Please ensure that all sign up requirements are met.";
      }

      await signUp.create({ phoneNumber: "+51 993606898" });

      await signUp.preparePhoneNumberVerification();
    } catch (err) {
      throw new Error("Error signing in");
    }
  };

  const verify = async () => {
    try {
      if (!signUp || !isSignUpLoaded) {
        throw "Something went wrong during the Sign up OAuth flow. Please ensure that all sign up requirements are met.";
      }

      await signUp.attemptPhoneNumberVerification({ code });

      await setSession(signUp.createdSessionId);
    } catch (err) {
      throw new Error("Error verifying phone number");
    }
  };

  return (
    <View className="rounded-lg border-2 border-gray-500 p-4">
      <Button
        title="Sign in with Google - use this"
        onPress={handleSignInWithGooglePress}
      />

      <Button title="Sign in with Phone" onPress={handleSignInWithPhone} />

      <TextInput value={code} onChangeText={setCode} />

      <Button title="Verify" onPress={verify} />

      <Button title="Sign Out" onPress={() => signOut()} />
    </View>
  );
};
