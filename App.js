import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/screens/HomeSceen";
import MovieScreen from "./src/screens/MovieScreen";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { Provider } from "react-redux";
import { store } from "./src/store";
import TvShowScreen from "./src/screens/TvShowScreen";
import ActorScreen from "./src/screens/ActorScreen";
import TvScreen from "./src/screens/TvScreen";

const Stack = createStackNavigator();

export default () => {
  const [fontLoaded] = useFonts({
    Regular: require("./assets/fonts/NunitoSans-Regular.ttf"),
    Bold: require("./assets/fonts/NunitoSans-Bold.ttf"),
    Black: require("./assets/fonts/NunitoSans-Black.ttf"),
    ExtraBold: require("./assets/fonts/NunitoSans-ExtraBold.ttf"),
    ExtraLight: require("./assets/fonts/NunitoSans-ExtraLight.ttf"),
    Light: require("./assets/fonts/NunitoSans-Light.ttf"),
    SemiBold: require("./assets/fonts/NunitoSans-SemiBold.ttf"),
  });

  return fontLoaded ? (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="movie"
            component={MovieScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="tvshows"
            component={TvShowScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="tvScreen"
            component={TvScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="person"
            component={ActorScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  ) : (
    <AppLoading />
  );
};
