import React from "react";

import { SafeAreaView, View } from "react-native";

import { SignInWithOAuth } from "../../ui/SignInWithOAuth";

export const SignInSignUpScreen = () => {
  return (
    <SafeAreaView className="">
      <View className="p-4">
        <SignInWithOAuth />
      </View>
    </SafeAreaView>
  );
};
