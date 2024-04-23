import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useGetSingleMovieQuery } from "../store/api/moviesApi";

const MovieScreen = ({ navigation, route }) => {
  const { data, isLoading } = useGetSingleMovieQuery(route.params.movieId);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  return (
    <View style={styles.container}>
      <StatusBar style="auto" translucent={false} />
      <Text>{data.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    textAlign: "center",
  },
});

export default MovieScreen;
