import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRecoilState } from "recoil";

import uuid from "react-native-uuid";

import { KeyboardAvoidingView, Platform, Pressable, Text, TextInput, View } from "react-native";
import SearchableDropdown from "react-native-searchable-dropdown";

import { allPortfolioBoughtAssetsInStorage } from "../../atoms/PortfolioAssets";
import { getAllCoins, getDetailedCoinData } from "../../services/api";

import styles from "./styles";

const AddNewAssetScreen = () => {
  const navigation = useNavigation();

  const [allCoins, setAllCoins] = useState([]);
  const [boughtAssetQuantity, setBoughtAssetQuantity] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedCoinId, setSelectedCoinId] = useState(null);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [assetsInStorage, setAssetsInStorage] = useRecoilState(allPortfolioBoughtAssetsInStorage);

  const isQuantityEntered = () => boughtAssetQuantity === "";

  const fetchAllCoins = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const responseAllCoins = await getAllCoins();
    setAllCoins(responseAllCoins);
    setLoading(false);
  };

  const fetchCoinInfo = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const coinInfo = await getDetailedCoinData(selectedCoinId);
    setSelectedCoin(coinInfo);
    setLoading(false);
  };

  useEffect(() => {
    fetchAllCoins();
  }, []);

  useEffect(() => {
    fetchCoinInfo();
  }, [selectedCoinId]);

  const onAddnewAsset = async () => {
    const newAsset = {
      id: selectedCoin.id,
      unique_id: selectedCoin.id + uuid.v4(),
      name: selectedCoin.name,
      image: selectedCoin.image.small,
      ticker: selectedCoin.symbol.toUpperCase(),
      quantityBought: parseFloat(boughtAssetQuantity),
      priceBought: selectedCoin.market_data.current_price.usd
    };

    const newAssets = [...assetsInStorage, newAsset];
    const jsonValue = JSON.stringify(newAssets);
    await AsyncStorage.setItem("@portfolio_coins", jsonValue);
    setAssetsInStorage(newAssets);
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      keyboardVerticalOffset={80}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SearchableDropdown
        items={allCoins}
        onItemSelect={(item) => setSelectedCoinId(item.id)}
        containerStyle={styles.dropdownContainer}
        itemStyle={styles.item}
        itemTextStyle={{ color: "white" }}
        resetValue={false}
        placeholder={selectedCoinId || "Select a coin..."}
        textInputProps={{
          placeholderTextColor: "white",
          underlineColorAndroid: "transparent",
          style: styles.textInput
        }}
      />
      {selectedCoin && (
        <>
          <View style={styles.boughtQuantityContainer}>
            <View style={{ flexDirection: "row" }}>
              <TextInput
                style={{ color: "white", fontSize: 90 }}
                value={boughtAssetQuantity}
                placeholder="0"
                keyboardType="numeric"
                onChangeText={setBoughtAssetQuantity}
              />
              <Text style={styles.ticker}>{selectedCoin.symbol.toUpperCase()}</Text>
            </View>
            <Text style={styles.pricePerCoin}>
              ${selectedCoin.market_data.current_price.usd} per coin
            </Text>
          </View>

          <Pressable
            style={{
              ...styles.buttonContainer,
              backgroundColor: isQuantityEntered() ? "#303030" : "#4169e1"
            }}
            onPress={onAddnewAsset}
            disabled={isQuantityEntered()}
          >
            <Text
              style={{
                ...styles.buttonText,
                color: isQuantityEntered() ? "grey" : "white"
              }}
            >
              Add New Asset
            </Text>
          </Pressable>
        </>
      )}
    </KeyboardAvoidingView>
  );
};

export default AddNewAssetScreen;
