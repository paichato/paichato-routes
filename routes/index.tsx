import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";
import { useAuth } from "../hooks/authContext";

export function Routes() {
  const { user, loadUser } = useAuth();

  return (
    <NavigationContainer>
      {user?._id ? <AppRoutes/> : <AuthRoutes/>}
      
    </NavigationContainer>
  );
}
