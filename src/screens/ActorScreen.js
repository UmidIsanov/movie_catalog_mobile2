import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useGetPersonByIdQuery } from "../store/api/peopleApi";
import COLORS from "../constants/Colors";
import FONTS from "../constants/Fonts";
import {
  useGetMovieCreditsByIdQuery,
  useGetPersonOwnDataByIdQuery,
} from "../store/api/moviesApi";
import { getPoster } from "../services/MovieService";
import { Feather, Ionicons } from "@expo/vector-icons";
import IMAGES from "../constants/Images";
import { ScrollView } from "react-native-gesture-handler";
import RecommendationCard from "../components/RecommendationCard";
import ItemSeparator from "../components/ItemSeparator";
import MovieCastCard from "../components/MovieCastCard";
const ActorScreen = ({ navigation, route }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading, error } = useGetPersonOwnDataByIdQuery(
    route.params.actorId
  );
  const {
    data: movieCredisData,
    error: movieCreditsError,
    isLoading: movieCredistLoading,
  } = useGetMovieCreditsByIdQuery(route.params.actorId);
  // console.log(movieCredisData);
  const changeIsOpenHandler = () => {
    setIsOpen((prev) => !prev);
  };
  if (isLoading || movieCredistLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Error: {error.message}</Text>
        <Button title="Go Back" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View>
          <Image
            source={
              data.profile_path
                ? { uri: getPoster(data.profile_path) }
                : IMAGES.NO_IMAGE
            }
            style={{ width: 160, height: 220, borderRadius: 10 }}
            resizeMode={data.profile_path ? "cover" : "contain"}
          />
        </View>
        <View style={styles.nameContainer}>
          {data && <Text style={styles.nameOfActor}>{data.name}</Text>}

          {data && <Text style={styles.birthOfActor}>{data.birthday}</Text>}

          {data && <Text style={styles.ageOfActor}>{data.place_of_birth}</Text>}
        </View>
      </View>
      <TouchableOpacity onPress={changeIsOpenHandler}>
        <View style={styles.biographyContainer}>
          <Text style={styles.biographyTitle}>Biography</Text>
          {isOpen ? (
            data && (
              <Text style={styles.biographyText}>
                {data.biography.slice(
                  0,
                  Math.floor(data.biography.length * 0.4)
                )}
                ...
              </Text>
            )
          ) : (
            <Text style={styles.biographyText}>{data.biography}</Text>
          )}
        </View>
      </TouchableOpacity>
      <View style={styles.backButtonIcon}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.goBack()}
        >
          <Feather name="chevron-left" size={35} color={COLORS.GRAY} />
        </TouchableOpacity>
      </View>
      <View>
        <FlatList
          data={movieCredisData.results}
          horizontal
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <ItemSeparator width={20} />}
          ListHeaderComponent={() => <ItemSeparator width={20} />}
          ListFooterComponent={() => <ItemSeparator width={20} />}
          renderItem={({ item }) => <MovieCastCard item={item} />}
        />
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  backButtonIcon: {
    paddingHorizontal: 20,
    position: "absolute",
    right: 0,
    left: 0,
    top: 50,
    elevation: 20,
  },
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 92,
  },
  nameContainer: {
    width: 153,
  },
  nameOfActor: {
    color: COLORS.GRAY,
    fontFamily: FONTS.BOLD,
    fontSize: 36,

    elevation: 20,
  },
  ageOfActor: {
    color: COLORS.BLACK,
    fontFamily: FONTS.BOLD,
    fontSize: 16,

    elevation: 20,
  },
  birthOfActor: {
    color: COLORS.BLACK,
    fontFamily: FONTS.BOLD,
    fontSize: 16,

    elevation: 20,
  },
  biographyContainer: {
    backgroundColor: COLORS.EXTRA_LIGHT_GRAY,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
  },
  biographyTitle: {
    color: COLORS.BLACK,
    fontFamily: FONTS.BOLD,
    fontSize: 18,
  },
  biographyText: {
    color: COLORS.LIGHT_GRAY,
    paddingVertical: 5,
    fontSize: 13,
    textAlign: "justify",
  },
});
export default ActorScreen;
