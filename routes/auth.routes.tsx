import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Onboarding from "../screens/Onboarding";
import Signup from "../screens/Signup";
import Login from "../screens/Login";


const { Navigator, Screen, Group } = createNativeStackNavigator();

//Routes that will be shown when not authorized
export function AuthRoutes() {

    return (
        <Navigator
          initialRouteName="OnboardingS1"
          screenOptions={{ headerShown: false }}
        >
            <Screen
        options={{ headerShown: false }}
        name="OnboardingS1"
        component={Onboarding}
      />
      <Screen
        options={{ headerShown: false, animation: "slide_from_bottom" }}
        name="Signup"
        component={Signup}
      />
      <Screen
        options={{ headerShown: false, animation: "fade_from_bottom" }}
        name="Login"
        component={Login}
      />
             </Navigator>
            )
}