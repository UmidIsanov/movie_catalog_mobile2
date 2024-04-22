import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import COLORS from "../constants/Colors";
const GenreCard = () => {
  return (
    <View style={styles.container}>
      <Text>Action</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: COLORS.WHITE,
    paddingVertical: 8,
    elevation: 3,
    marginVertical: 2,
  },
});
export default GenreCard;
