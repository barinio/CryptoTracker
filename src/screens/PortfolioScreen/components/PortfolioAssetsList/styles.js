import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  balanceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 10
  },
  currentBalance: {
    fontSize: 15,
    fontWeight: "600",
    color: "white"
  },
  currentBalanceValue: {
    fontSize: 40,
    fontWeight: "700",
    color: "white",
    letterSpacing: 1
  },
  valueChange: {
    fontSize: 16,
    fontWeight: "700"
  },
  percentageChange: {
    fontSize: 17,
    fontWeight: "600",
    color: "white"
  },

  percentageChangeContainer: {
    flexDirection: "row",
    paddingHorizontal: 3,
    paddingVertical: 8,
    borderRadius: 5
  },
  assetsLabel: {
    fontSize: 23,
    fontWeight: "700",
    color: "white",
    paddingVertical: 20,
    paddingHorizontal: 10
  },
  buttonContainer: {
    backgroundColor: "#4169e1",
    padding: 10,
    alignItems: "center",
    marginVertical: 25,
    marginHorizontal: 10,
    borderRadius: 5
  },
  buttonText: {
    fontSize: 17,
    fontWeight: "600",
    color: "white"
  },
  deleteButton: {
    flex: 1,
    backgroundColor: "#ea3943",
    alignItems: "flex-end",
    justifyContent: "center",
    paddingRight: 30,
    marginLeft: 20
  }
});

export default styles;
