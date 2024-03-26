import { Image, Text, View } from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import { useWatchList } from "../../../../Context/WatchListContext";

const CoinDetailedHeader = ({ coinId, image, symbol, marketCapRank }) => {
  const navigation = useNavigation();

  const { watchListCoinIds, storeWatchListCoinId, removeWatchListCoinId } =
    useWatchList();

  const isCheck = () =>
    watchListCoinIds.some((coinIdValue) => coinIdValue === coinId);

  const handleWatchListCoin = () => {
    if (isCheck()) {
      return removeWatchListCoinId(coinId);
    }
    return storeWatchListCoinId(coinId);
  };

  return (
    <View style={styles.headerContainer}>
      <Ionicons
        name="chevron-back-sharp"
        size={30}
        color="white"
        onPress={() => {
          navigation.navigate("Home");
        }}
      />
      <View style={styles.tickerContainer}>
        <Image source={{ uri: image }} style={{ width: 25, height: 25 }} />
        <Text style={styles.tickerTitle}>{symbol.toUpperCase()}</Text>
        <View style={styles.rankContainer}>
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 15 }}>
            #{marketCapRank}
          </Text>
        </View>
      </View>
      <FontAwesome
        name={isCheck() ? "star" : "star-o"}
        size={25}
        color={isCheck() ? "#ffbf00" : "white"}
        onPress={handleWatchListCoin}
      />
    </View>
  );
};

export default CoinDetailedHeader;
