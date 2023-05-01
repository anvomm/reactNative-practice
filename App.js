import { useState, useCallback, useEffect } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import * as Font from "expo-font";

import { StyleSheet, View } from "react-native";

import { RegistrationScreen } from "./Screens/registrationScreen/RegistrationScreen";
import { LoginScreen } from "./Screens/loginScreen/LoginScreen";
import { Home } from "./Screens/Home/Home";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isReady, setIsReady] = useState(false);

  

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          "Roboto-Regular": require("./assets/fonts/Roboto/roboto-v30-latin_cyrillic-regular.ttf"),
          "Roboto-Bold": require("./assets/fonts/Roboto/roboto-v30-latin_cyrillic-500.ttf"),
          "Roboto-700": require("./assets/fonts/Roboto/roboto-v30-latin_cyrillic-700.ttf"),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
        onLayoutRootView();
      }
    }

    prepare();
  }, []);

  const MainStack = createStackNavigator();

  const onLayoutRootView = useCallback(async () => {
    if (isReady) {
      await SplashScreen.hideAsync();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }
  return (
    <NavigationContainer>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <MainStack.Navigator screenOptions={{headerShown: false}} initialRouteName="Login">
          <MainStack.Screen
            name="Registration"
            component={RegistrationScreen}
          />
          <MainStack.Screen name="Login" component={LoginScreen} />
          <MainStack.Screen name="Home" component={Home} />
        </MainStack.Navigator>
        <StatusBar style="auto" />
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});