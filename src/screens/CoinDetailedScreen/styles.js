import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  priceContainer: {
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  name: { color: "white", fontSize: 15 },
  currentPrice: {
    color: "white",
    fontSize: 30,
    fontWeight: "600",
    letterSpacing: 1
  },
  priceChange: { color: "white", fontSize: 17, fontWeight: "500" },
  priceChangeContainer: {
    paddingHorizontal: 3,
    paddingVertical: 8,
    borderRadius: 5,
    flexDirection: "row"
  },

  input: {
    flex: 1,
    height: 40,
    margin: 12,
    borderBottomColor: "white",
    borderBottomWidth: 1,
    padding: 10,
    color: "white",
    fontSize: 16
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#2b2b2b",
    paddingVertical: 5,
    borderRadius: 5,
    marginVertical: 20
  },
  candleStickText: { color: "white", fontWeight: "700" },
  candleStickTextLabel: { color: "grey", fontSize: 13 },
  candleStickDataContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginTop: 20
  }
});

export default styles;
