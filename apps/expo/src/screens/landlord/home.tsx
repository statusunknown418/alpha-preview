import { useAuth } from "@clerk/clerk-expo";
import { Button, Text, View } from "react-native";

export const LandlordHomeScreen = () => {
  const { signOut } = useAuth();
  return (
    <View className="flex h-full flex-col items-center justify-center">
      <Text className="text-2xl">Landlord Home Screen</Text>

      <Button onPress={() => signOut()} title="Sign out" />
    </View>
  );
};
