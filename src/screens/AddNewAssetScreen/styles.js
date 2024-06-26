import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  dropdownContainer: {
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  item: {
    padding: 10,
    marginTop: 2,
    backgroundColor: "#1e1e1e",
    borderColor: "#444444",
    borderWidth: 1,
    borderRadius: 5,
  },
  textInput: {
    padding: 12,
    borderWidth: 1.5,
    borderColor: "#444444",
    borderRadius: 5,
    backgroundColor: "#1e1e1e",
    color: "white",
  },
  ticker: {
    color: "grey",
    fontWeight: "700",
    fontSize: 20,
    marginTop: 25,
    marginLeft: 5,
  },
  boughtQuantityContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: 50,
  },
  buttonContainer: {
    padding: 10,
    alignItems: "center",
    marginVertical: 30,
    marginHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: "600",
  },
  pricePerCoin: {
    fontSize: 17,
    fontWeight: "600",
    color: "grey",
    letterSpacing: 0.5,
  },
});

export default styles;
