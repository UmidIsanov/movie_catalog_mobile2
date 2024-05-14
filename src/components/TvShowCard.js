import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Touchable,
  TouchableOpacity,
  Image,
  TouchableNativeFeedback,
} from "react-native";
import COLORS from "../constants/Colors";
import FONTS from "../constants/Fonts";
import IMAGES from "../constants/Images";
import { Ionicons } from "@expo/vector-icons";
import { TMDB_IMAGE_BASE_URL } from "../constants/Urls";

const TvShowCard = ({
  goTo,
  item: {
    id,
    original_name,
    vote_count,
    poster_path,
    vote_average,
    original_language,
  },
}) => {
  const [liked, setLiked] = useState(false);

  return (
    <TouchableOpacity onPress={() => goTo(id)} activeOpacity={0.8}>
      <View style={styles.container}>
        <Image
          style={styles.backgroundImage}
          src={`${TMDB_IMAGE_BASE_URL}/w300${poster_path}`}
        />
        <View style={styles.imdbContainer}>
          <Image
            source={IMAGES.IMDB}
            resizeMode="cover"
            style={styles.imdImage}
          />
          {/* <Text style={styles.imdbRatting}>{vote_average.toFixed(1)}</Text> */}
        </View>
        <TouchableNativeFeedback onPress={() => setLiked(!liked)}>
          <Ionicons
            name={liked ? "heart" : "heart-outline"}
            size={25}
            color={liked ? COLORS.HEART : COLORS.WHITE}
            style={{ position: "absolute", bottom: 10, left: 10 }}
          />
        </TouchableNativeFeedback>
      </View>

      <Text style={styles.movieTitle} numberOfLines={3}>
        {original_name}
      </Text>

      <View style={styles.movieSubTitleContainer}>
        <Text style={styles.movieSubTitle}>{original_language} | U/A</Text>
        <View style={styles.rowAndCenter}>
          <Ionicons
            name="heart"
            size={24}
            color={COLORS.HEART}
            style={{ marginRight: 5 }}
          />
          {/* <Text style={styles.movieSubTitle}>{vote_count}</Text> */}
        </View>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  backgroundImage: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
  container: {
    backgroundColor: COLORS.LIGHT_GRAY,
    height: 340,
    width: 220,
    borderRadius: 12,
    elevation: 5,
    marginVertical: 2,
    position: "relative",
  },
  movieTitle: {
    fontFamily: FONTS.EXTRA_BOLD,
    color: COLORS.GRAY,
    paddingVertical: 2,
    marginTop: 5,
    width: 220,
  },
  movieSubTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  movieSubTitle: {
    fontSize: 12,
    fontFamily: FONTS.REGULAR,
  },
  rowAndCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
  imdbContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
    backgroundColor: COLORS.YELLOW,
    borderBottomLeftRadius: 5,
    borderTopRightRadius: 12,
    paddingVertical: 3,
  },
  imdImage: {
    height: 20,
    width: 50,
    // borderBottomEndRadius: 5,
  },
  imdbRatting: {
    marginRight: 5,
    color: COLORS.HEART,
    fontFamily: FONTS.EXTRA_BOLD,
  },
});

export default TvShowCard;
