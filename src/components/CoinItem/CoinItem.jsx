import { Image, Pressable, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";

const CoinItem = ({
  marketCoin: {
    name,
    current_price,
    market_cap_rank,
    price_change_percentage_24h,
    symbol,
    market_cap,
    image,
    id
  }
}) => {
  const normalizeMarketCap = (marketCap) => {
    if (marketCap > 1e12) {
      return `${Math.floor(marketCap / 1e12)} T`;
    }
    if (marketCap > 1e9) {
      return `${Math.floor(marketCap / 1e9)} B`;
    }
    if (marketCap > 1e6) {
      return `${Math.floor(marketCap / 1e6)} M`;
    }
    if (marketCap > 1e3) {
      return `${Math.floor(marketCap / 1e3)} K`;
    }
    return marketCap;
  };

  const percentageColor = price_change_percentage_24h < 0 ? "#ea3943" : "#16c784" || "white";

  const navigation = useNavigation();

  return (
    <Pressable
      style={styles.coinContainer}
      onPress={() => {
        navigation.navigate("CoinDetailedScreen", { coinId: id });
      }}
    >
      <Image
        source={{ uri: image }}
        style={{
          width: 30,
          height: 30,
          marginRight: 10,
          alignSelf: "center"
        }}
      />
      <View>
        <Text style={styles.title}>{name}</Text>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.rankContainer}>
            <Text style={styles.rank}>{market_cap_rank}</Text>
          </View>
          <Text style={styles.text}>{symbol.toUpperCase()}</Text>
          <AntDesign
            name={price_change_percentage_24h < 0 ? "caretdown" : "caretup"}
            size={12}
            color={percentageColor}
            style={{ alignSelf: "center", marginRight: 5 }}
          />
          <Text style={{ color: percentageColor }}>{price_change_percentage_24h?.toFixed(2)}%</Text>
        </View>
      </View>
      <View style={{ marginLeft: "auto", alignItems: "flex-end" }}>
        <Text style={styles.title}>{current_price}</Text>
        <Text style={{ color: "white" }}>MCap {normalizeMarketCap(market_cap)}</Text>
      </View>
    </Pressable>
  );
};

export default CoinItem;
