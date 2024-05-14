import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  FlatList,
} from "react-native";
import COLOR from "../constants/Colors";
import FONTS from "../constants/Fonts";
import {
  useGetAiringTodayTvShowsQuery,
  useGetOnTheAirTvShowsQuery,
  useGetPopularTvShowsQuery,
  useGetTopRatedTvShowsQuery,
} from "../store/api/moviesApi";
import MovieCard from "../components/MovieCard";
import TvShowCard from "../components/TvShowCard";
import ItemSeparator from "../components/ItemSeparator";

const TvShowScreen = ({ navigation }) => {
  const {
    data: topRatedData,
    error: topRatedError,
    isLoading: topRatedLoading,
  } = useGetTopRatedTvShowsQuery();
  const {
    data: airingTodayData,
    error: airingTodayError,
    isLoading: airingTodayLoading,
  } = useGetAiringTodayTvShowsQuery();
  const {
    data: OnTheAirData,
    error: OnTheAirError,
    isLoading: OnTheAirLoading,
  } = useGetOnTheAirTvShowsQuery();
  const {
    data: popularTvShowsData,
    error: popularTvShowsError,
    isLoading: popularTvShowsLoading,
  } = useGetPopularTvShowsQuery();
  if (popularTvShowsLoading || airingTodayLoading) {
    return <Text>Loading...</Text>;
  }
  const tvShowsListData = [
    {
      name: "Now Playing",
      data: airingTodayData.results,
    },
    {
      name: "Top Rated",
      data: topRatedData.results,
    },
    {
      name: "Upcoming",
      data: popularTvShowsData.results,
    },
    {
      name: "Popular",
      data: OnTheAirData.results,
    },
  ];
  const goTo = (id) => {
    navigation.navigate("tvScreen", { movieId: id });
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerGoBackContainer}>
        <Button
          style={styles.buttonGoBack}
          title="Go Back"
          onPress={() => navigation.goBack()}
        />
      </View>
      {tvShowsListData.map((list, index) => (
        <View key={index}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>{list.name}</Text>
            {/* <Text style={styles.headerSubTitle}>View All</Text> */}
          </View>
          <FlatList
            data={list.data}
            horizontal
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => <ItemSeparator width={20} />}
            ListHeaderComponent={() => <ItemSeparator width={20} />}
            ListFooterComponent={() => <ItemSeparator width={20} />}
            renderItem={({ item }) => <TvShowCard goTo={goTo} item={item} />}
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
  headerGoBackContainer: {
    padding: 0,
  },
  buttonGoBack: {
    borderRadius: 8,
  },
});

export default TvShowScreen;
