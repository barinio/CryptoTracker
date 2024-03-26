import { useEffect, useState } from "react";
import { FlatList, RefreshControl } from "react-native";
import { useWatchList } from "../../Context/WatchListContext";
import { getWatchListedCoins } from "../../services/api";
import CoinItem from "../../components/CoinItem/CoinItem";

const WatchListScreen = () => {
  const { watchListCoinIds } = useWatchList();

  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);

  const transformCoinIds = () => watchListCoinIds.join("%2C");

  const fetchWatchListedCoins = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const watchListedCoinsData = await getWatchListedCoins(
      1,
      transformCoinIds()
    );
    setCoins(watchListedCoinsData);
    setLoading(false);
  };

  useEffect(() => {
    if (watchListCoinIds.length > 0) {
      fetchWatchListedCoins();
    }
  }, [watchListCoinIds]);

  return (
    <FlatList
      data={coins}
      renderItem={({ item }) => <CoinItem marketCoin={item} />}
      refreshControl={
        <RefreshControl
          refreshing={loading}
          tintColor="white"
          onRefresh={watchListCoinIds.length > 0 ? fetchWatchListedCoins : null}
        />
      }
    />
  );
};

export default WatchListScreen;
