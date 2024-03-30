import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  coinContainer: {
    flexDirection: "row",
    padding: 15
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    alignSelf: "flex-end"
  },
  ticker: {
    color: "grey",
    fontWeight: "700"
  },
  quantityContainer: {
    marginLeft: "auto",
    alignItems: "flex-end"
  },
  image: { height: 30, width: 30, marginRight: 10, alignSelf: "center" }
});

export default styles;
