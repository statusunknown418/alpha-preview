import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { LandlordHomeScreen } from "../screens/landlord/home";
import { LandlordTabsParamList } from "./StackNavigator";

export const LandlordTabs = createBottomTabNavigator<LandlordTabsParamList>();

export const LandlordSpecificNavigation = () => {
  return (
    <LandlordTabs.Navigator>
      <LandlordTabs.Screen
        options={{
          headerShown: false,
        }}
        name="Home"
        component={LandlordHomeScreen}
      />
    </LandlordTabs.Navigator>
  );
};
