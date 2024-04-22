import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import COLOR from "../constants/Colors";
import { FlatList } from "react-native-gesture-handler";
import GenreCard from "../components/GenreCard";
const HomeScreen = () => {
  const Genres = ["All", "Action", "Comedy", "Romance", "Horror", "Sci-Fi"];
  return (
    <ScrollView style={styles.container}>
      <StatusBar
        style="auto"
        translucent={false}
        backgroundColor={COLOR.BASIC_BACKGROUND}
      />
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Now Playing</Text>
        <Text style={styles.headerSubTitle}>View All</Text>
      </View>
      <View>
        <FlatList
          data={Genres}
          horizontal
          keyExtractor={(item) => item}
          renderItem={({ item, index }) => <GenreCard />}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.BASIC_BACKGROUND,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerTitle: {
    fontSize: 28,
  },
  headerSubTitle: {
    fontSize: 13,
    color: COLOR.ACTIVE,
  },
});

export default HomeScreen;
