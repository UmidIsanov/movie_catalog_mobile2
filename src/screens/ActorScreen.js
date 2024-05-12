import React from "react";
import { View, Text, Button } from "react-native";
import { useGetPersonByIdQuery } from "../store/api/peopleApi";
import { useGetPersonOwnDataByIdQuery } from "../store/api/moviesApi";

const ActorScreen = ({ navigation, route }) => {
  const { data, isLoading, error } = useGetPersonOwnDataByIdQuery(
    route.params.actorId
  );

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
      <Text>ActorScreen</Text>
      {data && <Text>{data.name}</Text>}
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default ActorScreen;
