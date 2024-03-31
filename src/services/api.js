import axios from "axios";

export const instance = axios.create({
  baseURL: "https://api.coingecko.com/api/v3"
});

export const getDetailedCoinData = async (coinId) => {
  try {
    const response = await instance.get(
      `coins/${coinId}?localization=false&tickers=true&market_data=true&community_data=false&developer_data=false&sparkline=false`
    );
    return response.data;
  } catch (e) {
    console.log("getDetailedCoinData", e);
  }
};

export const getCoinMarketChart = async (coinId, selectedRange) => {
  try {
    const response = await instance.get(
      `coins/${coinId}/market_chart?vs_currency=usd&days=${selectedRange}&interval=daily`
    );
    return response.data;
  } catch (e) {
    console.log("getCoinMarketChart", e);
  }
};

export const getMarketData = async (page = 1) => {
  try {
    const response = await instance.get(
      `coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=${page}&sparkline=false&price_change_percentage=24h';`
    );
    return response.data;
  } catch (e) {
    console.log("getMarketData", e);
  }
};

export const getWatchListedCoins = async (page = 1, coinIds) => {
  try {
    const response = await instance.get(
      `coins/markets?vs_currency=usd&ids=${coinIds}&order=market_cap_desc&per_page=50&page=${page}&sparkline=false&price_change_percentage=24h`
    );
    return response.data;
  } catch (e) {
    console.log("getWatchListedCoins", e);
  }
};

export const getAllCoins = async () => {
  try {
    const response = await instance.get(`coins/list?include_platform=false`);
    return response.data;
  } catch (e) {
    console.log("getWatchListedCoins", e);
  }
};
