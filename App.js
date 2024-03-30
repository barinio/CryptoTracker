import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import Navigation from "./src/navigation/Navigation";
import WatchListProvider from "./src/Context/WatchListContext";

import { RecoilRoot } from "recoil";

export default function App() {
  return (
    <NavigationContainer
      theme={{
        colors: {
          background: "#121212",
        },
      }}
    >
      <RecoilRoot>
        <WatchListProvider>
          <View style={styles.container}>
            <Navigation />
            <StatusBar style="light" />
          </View>
        </WatchListProvider>
      </RecoilRoot>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    paddingTop: 50,
  },
});
