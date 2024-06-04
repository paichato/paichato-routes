import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";


const { Navigator, Screen, Group } = createNativeStackNavigator();

//Routes that will be shown when authorized
export function AppRoutes() {

    return (
        <Navigator
          initialRouteName="Home"
          screenOptions={{ headerShown: false }}
        >
            <Screen
        options={{ headerShown: false }}
        name="Home"
        component={Home}
      />
        {/* Other Screens should go here */}
             </Navigator>
            )
}