import { useEffect, useState } from "react";
import { FlatList, RefreshControl, Text, View } from "react-native";
import CoinItem from "../../components/CoinItem/CoinItem";
import { getMarketData } from "../../services/api";

import styles from "./styles";

const HomeScreen = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCoins = async (page) => {
    if (loading) {
      return;
    }
    setLoading(true);
    const coinstData = await getMarketData(page);
    setCoins((existingCoins) => [...existingCoins, ...coinstData]);
    setLoading(false);
  };

  const refetchCoins = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const coinstData = await getMarketData();
    setCoins(coinstData);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoins();
  }, []);

  return (
    <View>
      <Text style={{ ...styles.title, fontFamily: "DroidSans" }}>CryptoAssets</Text>
      <FlatList
        data={coins}
        renderItem={({ item }) => <CoinItem marketCoin={item} />}
        onEndReached={() => fetchCoins(coins.length / 50 + 1)}
        refreshControl={
          <RefreshControl refreshing={loading} tintColor="white" onRefresh={refetchCoins} />
        }
      />
    </View>
  );
};

export default HomeScreen;
