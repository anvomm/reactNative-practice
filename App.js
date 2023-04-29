import { useState, useCallback, useEffect } from "react";

import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import * as Font from "expo-font";

import { StyleSheet, View } from "react-native";

import { RegistrationScreen } from "./Screens/registrationScreen/RegistrationScreen";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          "Roboto-Regular": require("./assets/fonts/Roboto/roboto-v30-latin_cyrillic-regular.ttf"),
          "Roboto-Bold": require("./assets/fonts/Roboto/roboto-v30-latin_cyrillic-500.ttf"),
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

  const onLayoutRootView = useCallback(async () => {
    if (isReady) {
      await SplashScreen.hideAsync();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }
  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <RegistrationScreen />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
