import * as React from "react";
import { StyleSheet, Text, View } from "react-native";

import { RootStackScreenProps } from "../types";
import flickr from "../api/flickr";

const Home = ({ navigation }: RootStackScreenProps<"Home">) => {
  const getPhotos = async () => {
    const { data } = await flickr.search("nature");
    // console.log(data)
  };

  React.useEffect(() => {
    getPhotos();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>This will be home screen.</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
