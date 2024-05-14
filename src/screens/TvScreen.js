import React from "react";
import {
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  Linking,
  TouchableOpacity,
  View,
} from "react-native";
import FONTS from "../constants/Fonts";
import { Feather, Ionicons } from "@expo/vector-icons";
import COLORS from "../constants/Colors"; // Assuming you have a file for colors
import {
  useGetSingleTvShowQuery,
  useGetVideosByIdTvShowsQuery,
  useGetVideosByidQuery,
} from "../store/api/moviesApi";
import { ScrollView } from "react-native-gesture-handler";
import { getPoster, getVideo } from "../services/MovieService";
import { LinearGradient } from "expo-linear-gradient";
import ItemSeparator from "../components/ItemSeparator";

const { height, width } = Dimensions.get("screen");
const setHight = (h) => (height / 100) * h;
const setWidht = (w) => (width / 100) * w;
const TvScreen = ({ navigation, route }) => {
  const {
    data: singleTvShowData,
    error: singleTvShowError,
    isLoading: singleTvShowLoading,
  } = useGetSingleTvShowQuery(route.params.movieId);
  const {
    data: videoByIdData,
    error: popularError,
    isLoading: videoLoading,
  } = useGetVideosByIdTvShowsQuery(route.params.movieId);
  if (singleTvShowLoading || videoLoading) {
    return (
      <View
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Loading...</Text>
      </View>
    );
  }
  const trailer = videoByIdData.results.find((res) => res.type === "Trailer");

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient
        colors={["rgba(0,0,0,0.5)", " rgba(217,217,217, 0) "]}
        start={[0, 0.3]}
        style={styles.LinearGradient}
      />
      <View style={styles.moviePosterImageContainer}>
        <Image
          style={styles.movePosterImage}
          source={{ uri: getPoster(singleTvShowData.backdrop_path) }}
        />
      </View>

      <View style={styles.headerContainer}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.goBack()}
        >
          <Feather
            name="chevron-left"
            size={45}
            color={COLORS.EXTRA_LIGHT_GRAY}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.playButton}
        onPress={() =>
          Linking.openURL(
            getVideo(trailer ? trailer.key : videoByIdData.results[0].key)
          )
        }
      >
        <Ionicons name="play-circle-outline" size={70} color={COLORS.WHITE} />
      </TouchableOpacity>
      <ItemSeparator height={setHight(37)} />
      <View style={styles.movieTitleContainer}>
        <Text style={styles.moiveTitle} numberOfLines={2}>
          {singleTvShowData?.original_name}
        </Text>
        <View style={styles.row}>
          <Ionicons name="heart" size={22} color={COLORS.HEART} />
          <Text style={styles.ratingText}>
            {singleTvShowData?.vote_average.toFixed(1)}
          </Text>
        </View>
      </View>
      <View style={styles.overviewContainer}>
        <Text style={styles.overviewTitle}>Overview</Text>
        <Text style={styles.overviewText}>{singleTvShowData?.overview}</Text>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BASIC_BACKGROUND,
  },
  moviePosterImageContainer: {
    height: setHight(35),
    setWidht: setWidht(145),
    alignItems: "center",
    position: "absolute",
    left: setWidht((100 - 145) / 2),
    top: 0,
    borderBottomRightRadius: 300,
    borderBottomLeftRadius: 300,
    elevation: 8,
  },
  movePosterImage: {
    borderBottomRightRadius: 300,
    borderBottomLeftRadius: 300,
    width: setWidht(145),
    height: setHight(35),
  },
  LinearGradient: {
    width: setWidht(145),
    setHight: setHight(6),
    position: "absolute",
    top: 0,
    elevation: 9,
  },
  headerContainerRecommedation: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    position: "absolute",
    right: 0,
    left: 0,
    top: 50,
    elevation: 20,
  },
  headerText: {
    color: COLORS.WHITE,
    fontFamily: FONTS.BOLD,
  },
  playButton: {
    position: "absolute",
    top: 110,
    left: setWidht(50) - 70 / 2,
    elevation: 19,
  },
  movieTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  moiveTitle: {
    color: COLORS.BLACK,
    fontFamily: FONTS.EXTRA_BOLD,
    fontSize: 18,
    width: setWidht(60),
  },
  ratingText: {
    marginLeft: 5,
    color: COLORS.BLACK,
    fontFamily: FONTS.EXTRA_BOLD,
    fontSize: 15,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  genderText: {
    color: COLORS.LIGHT_GRAY,
    paddingHorizontal: 20,
    paddingTop: 5,
    fontFamily: FONTS.BOLD,
    fontSize: 13,
  },
  overviewContainer: {
    backgroundColor: COLORS.EXTRA_LIGHT_GRAY,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
  },
  overviewTitle: {
    color: COLORS.BLACK,
    fontFamily: FONTS.BOLD,
    fontSize: 18,
  },
  overviewText: {
    color: COLORS.LIGHT_GRAY,
    paddingVertical: 5,
    fontSize: 13,
    textAlign: "justify",
  },
  castTitleText: {
    color: COLORS.GRAY,
    fontFamily: FONTS.BOLD,
    fontSize: 23,
    marginLeft: 20,
    marginBottom: 5,
  },
  RecommendationCardTitleText: {
    color: COLORS.GRAY,
    fontFamily: FONTS.BOLD,
    fontSize: 23,
    marginLeft: 4,
    marginBottom: 5,
  },
  loadingContainer: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TvScreen;
