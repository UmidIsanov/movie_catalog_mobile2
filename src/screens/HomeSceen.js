import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import COLOR from "../constants/Colors";
import { FlatList } from "react-native-gesture-handler";
import GenreCard from "../components/GenreCard";
import ItemSeparator from "../components/ItemSeparator";
import { useState } from "react";
import MovieCard from "../components/MovieCard";
import FONTS from "../constants/Fonts";
import {
  useGetNowPlayingMoviesQuery,
  useGetTopRatedMoviesQuery,
} from "../store/api/moviesApi";

const Genres = ["All", "Action", "Comedy", "Romance", "Horror", "Sci-Fi"];
const HomeScreen = ({ navigation }) => {
  const {
    data: nowPlayingData,
    error: nowPlayingError,
    isLoading: nowPlayingLoading,
  } = useGetNowPlayingMoviesQuery();
  const {
    data: topRatedData,
    error: popularError,
    isLoading: topRatedLoading,
  } = useGetTopRatedMoviesQuery();

  const [activeGenre, setActiveGenre] = useState("All");

  if (nowPlayingLoading || topRatedLoading) {
    return <Text>Loading...</Text>;
  }

  const movieListData = [
    {
      name: "Now Playing",
      data: nowPlayingData.results,
    },
    {
      name: "Top Rated",
      data: topRatedData.results,
    },
  ];

  const goTo = (id) => {
    navigation.navigate("movie", { movieId: id });
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar
        style="auto"
        translucent={false}
        backgroundColor={COLOR.BASIC_BACKGROUND}
      />

      <View style={styles.genderListContainer}>
        <FlatList
          data={Genres}
          horizontal
          keyExtractor={(item) => item}
          ItemSeparatorComponent={() => <ItemSeparator width={20} />}
          ListHeaderComponent={() => <ItemSeparator width={20} />}
          ListFooterComponent={() => <ItemSeparator width={20} />}
          renderItem={({ item }) => (
            <GenreCard
              genreName={item}
              active={item === activeGenre ? true : false}
              onPress={setActiveGenre}
            />
          )}
        />
      </View>

      {movieListData.map((list, index) => (
        <View key={index}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>{list.name}</Text>
            <Text style={styles.headerSubTitle}>View All</Text>
          </View>
          <FlatList
            data={list.data}
            horizontal
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => <ItemSeparator width={20} />}
            ListHeaderComponent={() => <ItemSeparator width={20} />}
            ListFooterComponent={() => <ItemSeparator width={20} />}
            renderItem={({ item }) => <MovieCard goTo={goTo} item={item} />}
          />
        </View>
      ))}
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
    fontFamily: FONTS.REGULAR,
  },
  headerSubTitle: {
    fontSize: 13,
    color: COLOR.ACTIVE,
    fontFamily: FONTS.BOLD,
  },
  genderListContainer: {
    paddingVertical: 10,
  },
});

export default HomeScreen;
