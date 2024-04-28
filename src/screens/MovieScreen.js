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
} from "react-native";
import { TMDB_IMAGE_BASE_URL } from "../constants/Urls";
import { useGetSingleMovieQuery } from "../store/api/moviesApi";
import COLORS from "../constants/Colors";
import { getPoster, getVideo } from "../services/MovieService";
import ItemSeparator from "../components/ItemSeparator";
import { LinearGradient } from "expo-linear-gradient";
import FONTS from "../constants/Fonts";
import { Feather, Ionicons } from "@expo/vector-icons";

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

  if (isLoading) {
    return <Text>Loading...</Text>;
  }
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
        <Text style={styles.headerText}>Share</Text>
      </View>
      <TouchableOpacity
        style={styles.playButton}
        onPress={() => Linking.openURL(getVideo(data.title))}
      >
        <Ionicons name="play-circle-outline" size={70} color={COLORS.WHITE} />
      </TouchableOpacity>
      <ItemSeparator height={setHight(37)} />
      <Text>{data.title}</Text>
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
});

export default MovieScreen;
