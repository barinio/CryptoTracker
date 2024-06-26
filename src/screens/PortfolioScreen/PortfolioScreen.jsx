import { Suspense } from "react";
import { Text, View } from "react-native";
import PortfolioAssetsList from "./components/PortfolioAssetsList/PortfolioAssetsList";

const PortfolioScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <Suspense fallback={<Text style={{ color: "white" }}>Loading Please Wait!</Text>}>
        <PortfolioAssetsList />
      </Suspense>
    </View>
  );
};

export default PortfolioScreen;
