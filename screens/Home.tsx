import * as React from "react";
import { useSetRecoilState, useRecoilState, useRecoilValue } from "recoil";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";

import { photoProps, photosAtom, photosData } from "../store/atoms";
import { pageSelector, photosSelector } from "../store/selectors";
import { RootStackScreenProps } from "../types";
import Layout from "../constants/Layout";
import flickr from "../api/flickr";

const Home = ({ navigation }: RootStackScreenProps<"Home">) => {
  const [tag, setTag] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const setPhotos = useSetRecoilState(photosAtom);
  const photos = useRecoilValue(photosSelector);
  const page = useRecoilValue(pageSelector);

  const getPhotos = React.useCallback(
    async (pg?: number) => {
      if (tag) {
        setLoading(true);
        const { data } = await flickr.search(tag, pg);
        const { photo, page } = data.photos;
        setLoading(false);

        pg
          ? setPhotos((oldData) => {
              // @ts-ignore
              const old = oldData.photo;
              return { page, photo: [...old, ...photo] };
            })
          : setPhotos({ photo, page });
      }
    },
    [tag]
  );

  React.useEffect(() => {
    const delay = setTimeout(() => {
      getPhotos();
    }, 500);

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
        onEndReached={() => getPhotos(page + 1)}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<Text>search to see images</Text>}
        ListFooterComponent={
          loading ? <ActivityIndicator color="#ffb300" size={"large"} /> : null
        }
        keyExtractor={(item, index) => item.id + index.toString()} //same image may appear in the next page too
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
