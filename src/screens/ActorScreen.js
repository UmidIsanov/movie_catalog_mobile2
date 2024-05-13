import React from "react";
import { View, Text, Button, Image } from "react-native";
import { useGetPersonByIdQuery } from "../store/api/peopleApi";
import { useGetPersonOwnDataByIdQuery } from "../store/api/moviesApi";
import { getPoster } from "../services/MovieService";
import IMAGES from "../constants/Images";
const ActorScreen = ({ navigation, route }) => {
  const { data, isLoading, error } = useGetPersonOwnDataByIdQuery(
    route.params.actorId
  );
  console.log(data);

  if (isLoading) {
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
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Image
        source={
          data.profile_path
            ? { uri: getPoster(data.profile_path) }
            : IMAGES.NO_IMAGE
        }
        style={{ width: 80, height: 120 }}
        resizeMode={data.profile_path ? "cover" : "contain"}
      />
      {data && <Text>{data.name}</Text>}
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default ActorScreen;
