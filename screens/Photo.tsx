import * as React from "react";
import { StyleSheet, Image, ActivityIndicator, ScrollView } from "react-native";

import { View, Text } from "../components/Themed";
import Loading from "../components/Loading";

import { RootStackScreenProps } from "../types";
import Layout from "../constants/Layout";
import flickr from "../api/flickr";

const width = Layout.window.width - 40;

const Photo = ({ navigation, route }: RootStackScreenProps<"Photo">) => {
  const { item } = route.params;
  const [photo, setPhoto] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [height, setHeight] = React.useState(width);

  const getPhoto = React.useCallback(async () => {
    const { data } = await flickr.get(item.id);
    setPhoto(data.photo);
  }, [item]);

  const getSize = React.useCallback(() => {
    // @ts-ignore
    Image.getSize(item.url, (imgWidth, imgHeight) => {
      setHeight((width * imgHeight) / imgWidth);
    });
  }, [item]);

  React.useEffect(() => {
    getPhoto();
    getSize();
  }, [item]);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={{ uri: item.url }} style={[styles.img, { height }]} />

        {photo ? (
          <>
            <View style={styles.owner}>
              <Text style={styles.link}>
                {photo && (photo.owner?.realname || photo.owner?.username)}
              </Text>

              <Text style={styles.link}>{photo?.owner?.location}</Text>
            </View>

            <Text style={styles.title}>{photo?.title?._content}</Text>

            <Text>{photo?.description?._content}</Text>
          </>
        ) : (
          <Loading />
        )}
      </ScrollView>
    </View>
  );
};

export default Photo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  img: {
    width,
    height: width,
    borderRadius: 10,
  },
  owner: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 20,
    marginVertical: 5,
    fontWeight: "bold",
  },
  link: {
    fontSize: 14,
    color: "#2e78b7",
  },
});
