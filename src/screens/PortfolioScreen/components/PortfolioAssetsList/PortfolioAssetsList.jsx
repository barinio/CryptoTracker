import { useNavigation } from "@react-navigation/native";
import { useRecoilValue, useRecoilState } from "recoil";
import { SwipeListView } from "react-native-swipe-list-view";

import { Pressable, Text, View } from "react-native";
import PortfolioAssetItem from "../PortfolioAssetItem/PortfolioAssetItem";

import { AntDesign, FontAwesome } from "@expo/vector-icons";
import {
  allPortfolioAssets,
  allPortfolioBoughtAssetsInStorage
} from "../../../../atoms/PortfolioAssets";

import styles from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PortfolioAssetsList = () => {
  const { navigate } = useNavigation();
  const assets = useRecoilValue(allPortfolioAssets);
  const [storageAssets, setStorageAssets] = useRecoilState(allPortfolioBoughtAssetsInStorage);

  const getCurrentBalance = () =>
    assets.reduce(
      (total, currentAsset) => total + currentAsset.currentPrice * currentAsset.quantityBought,
      0
    );

  const getCurrentValueChange = () => {
    const currentBalance = getCurrentBalance();
    const boughtBalance = assets.reduce(
      (total, currentAsset) => total + currentAsset.priceBought * currentAsset.quantityBought,
      0
    );
    return (currentBalance - boughtBalance).toFixed(2);
  };

  const getCurrentPercentageChange = () => {
    const currentBalance = getCurrentBalance();
    const boughtBalance = assets.reduce(
      (total, currentAsset) => total + currentAsset.priceBought * currentAsset.quantityBought,
      0
    );
    return (((currentBalance - boughtBalance) / boughtBalance) * 100).toFixed(2) || 0;
  };

  const onDeleteAsset = async (asset) => {
    const newAssets = storageAssets.filter((coin) => coin.unique_id !== asset.item.unique_id);
    const jsonValue = JSON.stringify(newAssets);
    await AsyncStorage.setItem("@portfolio_coins", jsonValue);
    setStorageAssets(newAssets);
  };

  const renderDeleteButton = (data) => {
    return (
      <Pressable style={styles.deleteButton} onPress={() => onDeleteAsset(data)}>
        <FontAwesome name="trash-o" size={24} color="white" />
      </Pressable>
    );
  };

  const isChangePositive = () => getCurrentValueChange() >= 0;

  return (
    <SwipeListView
      data={assets}
      renderItem={({ item }) => <PortfolioAssetItem assetItem={item} />}
      rightOpenValue={-75}
      disableRightSwipe
      closeOnRowPress
      keyExtractor={({ id }, index) => `${id} ${index}`}
      renderHiddenItem={(data) => renderDeleteButton(data)}
      ListHeaderComponent={
        <>
          <View style={styles.balanceContainer}>
            <View>
              <Text style={styles.currentBalance}>Current Balance</Text>
              <Text style={styles.currentBalanceValue}>${getCurrentBalance().toFixed(2)}</Text>
              <Text
                style={{
                  ...styles.valueChange,
                  color: isChangePositive() ? "#16c784" : "#ea3943"
                }}
              >
                ${getCurrentValueChange()} (All Time)
              </Text>
            </View>

            <View
              style={{
                ...styles.percentageChangeContainer,
                backgroundColor: isChangePositive() ? "#16c784" : "#ea3943"
              }}
            >
              <AntDesign
                name={isChangePositive() ? "caretup" : "caretdown"}
                size={12}
                color="white"
                style={{ alignSelf: "center", marginRight: 5 }}
              />
              <Text style={styles.percentageChange}>{getCurrentPercentageChange()}%</Text>
            </View>
          </View>
          <Text style={styles.assetsLabel}>Your Assets</Text>
        </>
      }
      ListFooterComponent={
        <Pressable style={styles.buttonContainer} onPress={() => navigate("AddNewAssetScreen")}>
          <Text style={styles.buttonText}>Add New Asset</Text>
        </Pressable>
      }
    />
  );
};

export default PortfolioAssetsList;
