import { ActivityIndicator, Text, TextInput, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import CoinDetailedHeader from "./components/CoinDetailedHeader/CoinDetailedHeader";
import styles from "./styles";
import { useRoute } from "@react-navigation/native";
import { getCoinMarketChart, getDetailedCoinData } from "../../services/api";
import { useEffect, useState } from "react";

const CoinDetailedScreen = () => {
  const [coin, setCoin] = useState(null);
  const [coinMarketData, setCoinMarketData] = useState(null);

  const { params } = useRoute();
  const { coinId } = params;

  const [loading, setLoading] = useState(false);
  const [coinValue, setCoinValue] = useState("1");
  const [usdValue, setUsdValue] = useState("");

  const fetchCoinData = async () => {
    setLoading(true);
    const fetchedCoinData = await getDetailedCoinData(coinId);
    const fetchedCoinMarketData = await getCoinMarketChart(coinId);
    setCoin(fetchedCoinData);
    setCoinMarketData(fetchedCoinMarketData);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoinData();
  }, []);

  if (loading || !coin || !coinMarketData) {
    return <ActivityIndicator size="large" />;
  }

  const {
    id,
    image: { small },
    name,
    symbol,
    market_data: {
      market_cap_rank,
      current_price,
      price_change_percentage_24h,
    },
  } = coin;

  const percentageColor =
    price_change_percentage_24h < 0 ? "#ea3943" : "#16c784" || "white";

  // const formatCurrency = (value) => {
  //   "worklet";
  //   if (value === "") {
  //     return `$${current_price.usd.toFixed(2)}`;
  //   }
  //   return `$${parseFloat(value).toFixed(2)}`;
  // };

  const changeCoinValue = (value) => {
    setCoinValue(value);
    const floatValue = parseFloat(value.replace(",", ".")) || 0;
    setUsdValue((floatValue * current_price.usd).toString());
  };
  const changeUsdValue = (value) => {
    setUsdValue(value);
    const floatValue = parseFloat(value.replace(",", ".")) || 0;
    setCoinValue((floatValue / current_price.usd).toString());
  };

  return (
    <View>
      <CoinDetailedHeader
        coinId={id}
        image={small}
        symbol={symbol}
        marketCapRank={market_cap_rank}
      />
      <View style={styles.priceContainer}>
        <View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.currentPrice}>${current_price.usd}</Text>
        </View>
        <View
          style={{
            ...styles.priceChangeContainer,
            backgroundColor: percentageColor,
          }}
        >
          <AntDesign
            name={price_change_percentage_24h < 0 ? "caretdown" : "caretup"}
            size={12}
            color="white"
            style={{ alignSelf: "center", marginRight: 5 }}
          />
          <Text style={styles.priceChange}>
            {price_change_percentage_24h?.toFixed(2)}%
          </Text>
        </View>
      </View>
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <Text style={{ color: "white", alignSelf: "center" }}>
            {symbol.toUpperCase()}
          </Text>
          <TextInput
            style={styles.input}
            value={coinValue}
            keyboardType="numeric"
            onChangeText={changeCoinValue}
          />
        </View>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <Text style={{ color: "white", alignSelf: "center" }}>USD</Text>
          <TextInput
            style={styles.input}
            value={usdValue}
            keyboardType="numeric"
            onChangeText={changeUsdValue}
          />
        </View>
      </View>
    </View>
  );
};

export default CoinDetailedScreen;
