import { Role } from "@acme/api/src/router/auth";
import { useUser } from "@clerk/clerk-expo";
import { SwitcherScreen } from "../screens/auth/switcher";
import { LandlordSpecificNavigation } from "./LandlordNavigation";
import { AppStackWrapper } from "./StackNavigator";
import { StudentSpecificNavigation } from "./StudentNavigation";

export const AppStack = () => {
  const { user } = useUser();

  if (!user) return null;

  const hasMetadata = Object.values(user.publicMetadata || {}).length > 0;

  const role = hasMetadata && (user.publicMetadata?.role as Role);

  return (
    <AppStackWrapper.Navigator>
      {hasMetadata ? (
        <AppStackWrapper.Group>
          {role === "student" ? (
            <AppStackWrapper.Screen
              name="Student"
              component={StudentSpecificNavigation}
              options={{
                headerShown: false,
              }}
            />
          ) : (
            <AppStackWrapper.Screen
              name="Landlord"
              component={LandlordSpecificNavigation}
              options={{
                headerShown: false,
              }}
            />
          )}
        </AppStackWrapper.Group>
      ) : (
        <AppStackWrapper.Group>
          <AppStackWrapper.Screen
            name="Switcher"
            component={SwitcherScreen}
            options={{
              headerShown: false,
            }}
          />
        </AppStackWrapper.Group>
      )}
    </AppStackWrapper.Navigator>
  );
};
