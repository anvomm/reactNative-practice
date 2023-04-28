import { useState, useCallback, useEffect } from "react";

import * as SplashScreen from "expo-splash-screen";
/* import { StatusBar } from 'expo-status-bar';*/
import { StyleSheet, Text, View } from "react-native";
import { RegistrationScreen } from "./Screens/registrationScreen/RegistrationScreen";
import * as Font from 'expo-font';


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
        onLayoutRootView ();
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
  return <View style={{ flex: 1 }}
  onLayout={onLayoutRootView}><RegistrationScreen /></View>;

  {
    /* <View style={styles.container}> */
  }

  {
    /* <Text>Open up App.js to start working on your app!</Text> */
  }
  {
    /* <StatusBar style="auto" /> */
  }
  {
    /* </View> */
  }
}

/*  const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }, 
}); */
