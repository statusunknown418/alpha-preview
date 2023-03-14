import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "../screens/student/home";
import { StudentTabsParamList } from "./StackNavigator";

export const StudentTabs = createBottomTabNavigator<StudentTabsParamList>();

export const StudentSpecificNavigation = () => {
  return (
    <StudentTabs.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <StudentTabs.Screen name="Home" component={HomeScreen} />
      <StudentTabs.Screen name="Calendar" component={HomeScreen} />
      <StudentTabs.Screen name="Finances" component={HomeScreen} />
      <StudentTabs.Screen name="Settings" component={HomeScreen} />
    </StudentTabs.Navigator>
  );
};
