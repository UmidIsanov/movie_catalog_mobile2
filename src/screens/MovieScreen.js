import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  Image,
  ScrollView,
  Dimensions,
  View,
  Touchable,
  TouchableOpacity,
  Linking,
  FlatList,
} from "react-native";
import { TMDB_IMAGE_BASE_URL } from "../constants/Urls";
import {
  useGetGreditsMovieByIdQuery,
  useGetSingleMovieQuery,
  useGetVideosByidQuery,
} from "../store/api/moviesApi";
import COLORS from "../constants/Colors";
import { getLanguage, getPoster, getVideo } from "../services/MovieService";
import ItemSeparator from "../components/ItemSeparator";
import { LinearGradient } from "expo-linear-gradient";
import FONTS from "../constants/Fonts";
import { Feather, Ionicons } from "@expo/vector-icons";
import CastCard from "../components/CastCard";

const { height, width } = Dimensions.get("screen");
const setHight = (h) => (height / 100) * h;
const setWidht = (w) => (width / 100) * w;

const MovieScreen = ({
  navigation,
  route,
  title,
  backdrop_path,
  poster_path,
}) => {
  const { data, isLoading } = useGetSingleMovieQuery(route.params.movieId);
  const {
    data: creditsdData,
    error: creditsError,
    isLoading: creditsLoading,
  } = useGetGreditsMovieByIdQuery(route.params.movieId);
  const {
    data: videoByIdData,
    error: popularError,
    isLoading: videoLoading,
  } = useGetVideosByidQuery(route.params.movieId);
  if (isLoading || videoLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const goTo = (id) => {
    navigation.navigate("person", { actorId: id });
  };

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
          source={{ uri: getPoster(data.backdrop_path) }}
        />
      </View>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.goBack()}
        >
          <Feather name="chevron-left" size={35} color={COLORS.WHITE} />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerText}>Share</Text>
        </View>
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
          {data?.original_title}
        </Text>
        <View style={styles.row}>
          <Ionicons name="heart" size={22} color={COLORS.HEART} />
          <Text style={styles.ratingText}>{data?.vote_average.toFixed(1)}</Text>
        </View>
      </View>
      <Text style={styles.genderText}>
        {data?.genres?.map((genre) => genre?.name)?.join(", ")} |{" "}
        {data?.runtime} Min
      </Text>
      <Text style={styles.genderText}>
        {getLanguage(data?.original_language)?.english_name}
      </Text>
      <View style={styles.overviewContainer}>
        <Text style={styles.overviewTitle}>Overview</Text>
        <Text style={styles.overviewText}>{data?.overview}</Text>
      </View>
      <View>
        <Text style={styles.castTitleText}>Cast</Text>
        <FlatList
          data={creditsdData?.cast}
          horizontal
          keyExtractor={(item) => item?.id}
          ItemSeparatorComponent={() => <ItemSeparator width={20} />}
          ListHeaderComponent={() => <ItemSeparator width={20} />}
          ListFooterComponent={() => <ItemSeparator width={20} />}
          renderItem={({ item }) => (
            <CastCard
              originalName={item?.name}
              characterName={item?.character}
              image={item?.profile_path}
              goTo={goTo}
              id={item.id}
            />
          )}
        />
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
    color: COLORS.BLACK,
    fontFamily: FONTS.BOLD,
    fontSize: 23,
    marginLeft: 20,
    marginBottom: 5,
  },
  loadingContainer: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MovieScreen;
