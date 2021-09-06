import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Image,
} from "react-native";
import { useSetRecoilState, useRecoilState, useRecoilValue } from "recoil";

import { RootStackScreenProps } from "../types";
import flickr from "../api/flickr";
import { photoProps, photosAtom } from "../store/atoms";
import { pageSelector, photosSelector } from "../store/selectors";
import Layout from "../constants/Layout";

const Home = ({ navigation }: RootStackScreenProps<"Home">) => {
  const [tag, setTag] = React.useState("");
  const setPhotos = useSetRecoilState(photosAtom);
  const photos = useRecoilValue(photosSelector);
  const page = useRecoilValue(pageSelector);

  const getPhotos = React.useCallback(async () => {
    const { data } = await flickr.search(tag);
    setPhotos(data);
  }, [tag]);

  React.useEffect(() => {
    const delay = setTimeout(() => {
      getPhotos();
    }, 1000);

    return () => clearTimeout(delay);
  }, [tag]);

  const renderPhotos = ({ item }: { item: photoProps }) => {
    return (
      <Image
        source={{ uri: item.url }}
        resizeMode={"contain"}
        style={styles.img}
      />
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={(tag) => {
          setTag(tag);
        }}
        placeholder={"type to search images..."}
        style={styles.input}
        value={tag}
      />

      <FlatList
        numColumns={2}
        data={photos}
        renderItem={renderPhotos}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<Text>search to see images</Text>}
      />
    </View>
  );
};

export default Home;

const thumbWidth = (Layout.window.width - 60) / 2; // half width - (paddings + margins)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 20,
  },
  input: {
    height: 56,
    width: "100%",
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    textAlign: "center",
    borderColor: "#ffb300",
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
  },
  img: {
    height: thumbWidth,
    width: thumbWidth,
    margin: 5,
    borderRadius: 5,
  },
});
