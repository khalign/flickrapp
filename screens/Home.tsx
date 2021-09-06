import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSetRecoilState, useRecoilState, useRecoilValue } from "recoil";

import { RootStackScreenProps } from "../types";
import flickr from "../api/flickr";
import { photosAtom } from "../store/atoms";
import { pageSelector, photosSelector } from "../store/selectors";

const Home = ({ navigation }: RootStackScreenProps<"Home">) => {
  const setPhotos = useSetRecoilState(photosAtom);
  const photos = useRecoilValue(photosSelector);
  const page = useRecoilValue(pageSelector);

  const getPhotos = async () => {
    const { data } = await flickr.search("nature");
    setPhotos(data);
  };

  React.useEffect(() => {
    getPhotos();
  }, []);

  React.useEffect(() => {
    console.log(page);
    console.log(photos[0]);
  }, [photos]);

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
