import { useAuth, useUser } from "@clerk/clerk-expo";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { trpc } from "../../utils/trpc";

export const SwitcherScreen = () => {
  const { signOut, getToken } = useAuth();

  const { user } = useUser();

  const navigation = useNavigation();

  const route = useRoute();

  const { mutate } = trpc.auth.updateClerkUser.useMutation({
    onSuccess: ({ public_metadata: { role } }) => {
      console.log("role", role);

      console.log(route.name, route.path);

      // navigation.navigate();
    },
  });

  if (!user) {
    return null;
  }

  const handleMakeStudent = async () => {
    mutate({
      publicMetadata: "student",
      id: user.id,
      token: (await getToken()) as string,
    });
  };

  const handleMakeLandlord = async () => {
    mutate({
      publicMetadata: "landlord",
      id: user.id,
      token: (await getToken()) as string,
    });
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <SafeAreaView>
      <View className="flex items-center justify-center gap-4">
        <Text className="mb-4 text-2xl font-bold">Switcher</Text>

        <Text>Select your role</Text>

        <View className="flex">
          <TouchableOpacity
            className="rounded-lg border p-2 text-center"
            onPress={handleMakeStudent}
          >
            <Text>Student</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="rounded-lg border p-2 text-center"
            onPress={handleMakeLandlord}
          >
            <Text>Landlord</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          className="rounded-lg border border-green-600 p-2 text-center"
          onPress={handleSignOut}
        >
          <Text>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
