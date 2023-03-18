import { Role } from "@acme/api/src/router/auth";
import { useSession, useUser } from "@clerk/clerk-expo";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SignInSignUpScreen } from "../screens/auth/signin";
import { SwitcherScreen } from "../screens/auth/switcher";
import { useMetadataStore } from "../utils/zustand/useMetadataStore";
import { LandlordSpecificNavigation } from "./LandlordNavigation";
import { StudentSpecificNavigation } from "./StudentNavigation";

export type StudentTabsParamList = {
  Home: undefined;
  ReviewsForPost: {
    id: string;
  };
  WriteAReview: {
    postId: string;
  };
  Calendar: undefined;
  Finances: undefined;
  Settings: undefined;
};

export type LandlordTabsParamList = {
  Home: undefined;
  ReviewsForPost: {
    id: string;
  };
  MyPosts: undefined;
  AddPost: undefined;
  EditPost: {
    postId: string;
  };
  Incomes: undefined;
  Settings: undefined;
};

export type RootStackParamList = {
  SignInSignUp: undefined;
  App: undefined;
  Switcher: undefined;
  Student: StudentTabsParamList;
  Landlord: LandlordTabsParamList;
};

export type AppStackParamList = {
  Student: StudentTabsParamList;
  Landlord: LandlordTabsParamList;
  Switcher: undefined;
};

export const RootStack = createNativeStackNavigator<RootStackParamList>();

export const MainNavigationContainer = () => {
  const { isSignedIn, isLoaded } = useSession();

  if (!isLoaded)
    return (
      <SafeAreaView>
        <View className="mt-20 p-4">
          <Text>Loading...</Text>
        </View>
      </SafeAreaView>
    );

  return (
    <NavigationContainer>
      <RootStack.Navigator>
        {isSignedIn && (
          <RootStack.Group>
            <RootStack.Screen
              name="App"
              component={AppStackWrapper}
              options={{
                headerShown: false,
              }}
            />
          </RootStack.Group>
        )}

        {!isSignedIn && (
          <RootStack.Group>
            <RootStack.Screen
              name="SignInSignUp"
              component={SignInSignUpScreen}
              options={{
                headerShown: false,
              }}
            />
          </RootStack.Group>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export const AppStackWrapper = () => {
  const { user } = useUser();

  if (!user) return null;

  const hasMetadata = Object.values(user.publicMetadata || {}).length > 0;

  const role = hasMetadata && (user.publicMetadata?.role as Role);

  const store = useMetadataStore((state) => state.role);

  console.log({ store, role, hasMetadata });

  return (
    <RootStack.Navigator>
      {hasMetadata || store ? (
        <RootStack.Group>
          {role === "student" || store === "student" ? (
            <RootStack.Screen
              name="Student"
              component={StudentSpecificNavigation}
              options={{
                headerShown: false,
              }}
            />
          ) : (
            <RootStack.Screen
              name="Landlord"
              component={LandlordSpecificNavigation}
              options={{
                headerShown: false,
              }}
            />
          )}
        </RootStack.Group>
      ) : (
        <RootStack.Group>
          <RootStack.Screen
            name="Switcher"
            component={SwitcherScreen}
            options={{
              headerShown: false,
            }}
          />
        </RootStack.Group>
      )}
    </RootStack.Navigator>
  );
};
