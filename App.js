import { NavigationContainer } from "@react-navigation/native";
import { RecoilRoot } from "recoil";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import Navigation from "./src/navigation/Navigation";
import WatchListProvider from "./src/Context/WatchListContext";

import { useFonts, Inter_900Black } from "@expo-google-fonts/inter";
import Animated from "react-native-reanimated";
const DroidSans = require("./assets/fonts/DroidSans.ttf");

export default function App() {
  let [fontsLoaded, fontError] = useFonts({ Inter_900Black, DroidSans });

  if (!fontsLoaded && !fontError) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <NavigationContainer
      theme={{
        colors: {
          background: "#121212"
        }
      }}
    >
      <RecoilRoot>
        <WatchListProvider>
          <GestureHandlerRootView>
            <Animated.View style={styles.container}>
              <Navigation />
              <StatusBar style="light" />
            </Animated.View>
          </GestureHandlerRootView>
        </WatchListProvider>
      </RecoilRoot>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    paddingTop: 50
  }
});
