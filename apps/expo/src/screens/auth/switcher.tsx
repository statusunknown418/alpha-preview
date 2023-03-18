import { useAuth, useUser } from "@clerk/clerk-expo";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack/lib/typescript/src/types";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import {
  AppStackParamList,
  LandlordTabsParamList,
  RootStackParamList,
  StudentTabsParamList,
} from "../../navigation/StackNavigator";
import { trpc } from "../../utils/trpc";
import { useMetadataStore } from "../../utils/zustand/useMetadataStore";

export type NavigatedRoute =
  | keyof AppStackParamList
  | keyof LandlordTabsParamList
  | keyof StudentTabsParamList
  | keyof RootStackParamList;

export type TypedNavigationProps<R extends NavigatedRoute> =
  CompositeNavigationProp<
    BottomTabNavigationProp<
      StudentTabsParamList &
        LandlordTabsParamList &
        AppStackParamList &
        RootStackParamList,
      R
    >,
    NativeStackNavigationProp<AppStackParamList>
  >;

export const SwitcherScreen = () => {
  const { signOut, getToken } = useAuth();

  const { user } = useUser();

  const navigation = useNavigation();

  const setStore = useMetadataStore((state) => state.setRole);

  const { mutate } = trpc.auth.updateClerkUser.useMutation({
    onSuccess: ({ public_metadata: { role } }) => {
      setStore(role);

      navigation.navigate("App", {
        screen: role === "student" ? "Student" : "Landlord",
      });
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
