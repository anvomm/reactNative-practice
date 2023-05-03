import { useState, useCallback, useEffect } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import * as Font from "expo-font";

import { StyleSheet, View, TouchableOpacity, Image } from "react-native";

import { RegistrationScreen } from "./Screens/registrationScreen/RegistrationScreen";
import { LoginScreen } from "./Screens/loginScreen/LoginScreen";
import { Home } from "./Screens/Home/Home";
import { CommentsScreen } from "./Screens/CommentsScreen/CommentsScreen";
import { MapScreen } from "./Screens/MapScreen/MapScreen";

import Back from "./assets/images/svg/arrowLeft.svg";

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
        <MainStack.Navigator initialRouteName="Login">
          <MainStack.Screen
            name="Registration"
            options={{headerShown: false}}
            component={RegistrationScreen}
          />
          <MainStack.Screen name="Login" options={{headerShown: false}} component={LoginScreen} />
          <MainStack.Screen options={{headerShown: false}} name="Home" component={Home} />
          <MainStack.Screen options={{
              title: "Комментарии",
              headerStyle: {
                borderBottomColor: "#E5E5E5",
                borderBottomWidth: 1,
                height: 88,
              },
              headerBackImage: ()=>(<Back />),
              headerBackTitleVisible: false,
              headerTintColor: "#212121",
              headerTitleAlign: "center",
              headerTitleStyle: {
                fontWeight: 500,
                fontFamily: "Roboto-Bold",
                fontSize: 17,
              },
            }} name="Comments" component={CommentsScreen} />
            <MainStack.Screen options={{
              title: "Карта",
              headerStyle: {
                borderBottomColor: "#E5E5E5",
                borderBottomWidth: 1,
                height: 88,
              },
              headerBackImage: ()=>(<Back />),
              headerBackTitleVisible: false,
              headerTintColor: "#212121",
              headerTitleAlign: "center",
              headerTitleStyle: {
                fontWeight: 500,
                fontFamily: "Roboto-Bold",
                fontSize: 17,
              },
            }} name="Map" component={MapScreen} />
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