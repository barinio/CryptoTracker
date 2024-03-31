import { memo } from "react";
import { Pressable, Text } from "react-native";

import styles from "./styles";

const FilterComponent = ({ filterDay, filterText, selectedRange, setSelectedRange }) => {
  const isFilterSelected = (filter) => filter === selectedRange;

  return (
    <Pressable
      style={{
        ...styles.filterContainer,
        backgroundColor: isFilterSelected(filterDay) ? "#1e1e1e" : "transparent"
      }}
      onPress={() => setSelectedRange(filterDay)}
    >
      <Text style={{ color: isFilterSelected(filterDay) ? "white" : "grey" }}>{filterText}</Text>
    </Pressable>
  );
};

export default memo(FilterComponent);
