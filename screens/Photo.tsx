import * as React from "react";
import { StyleSheet, Text, View, Image, ActivityIndicator } from "react-native";

import { RootStackScreenProps } from "../types";
import Layout from "../constants/Layout";
import flickr from "../api/flickr";

const Photo = ({ navigation, route }: RootStackScreenProps<"Photo">) => {
  const { item } = route.params;
  const [photo, setPhoto] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const getPhoto = React.useCallback(async () => {
    const { data } = await flickr.get(item.id);
    setPhoto(data.photo);
  }, []);

  React.useEffect(() => {
    getPhoto();
  }, []);

  return (
    <View style={styles.container}>
      <Image source={{ uri: item.url }} style={styles.img} />
      {photo ? (
        <>
          <View style={styles.owner}>
            <Text style={styles.link}>
              {photo?.owner?.realname || photo?.owner?.username}
            </Text>
            <Text style={styles.link}>{photo?.owner?.location}</Text>
          </View>

          <Text style={styles.title}>{photo?.title?._content}</Text>

          <Text>{photo?.description?._content}</Text>
        </>
      ) : (
        <ActivityIndicator size={"large"} color="#ffb300" />
      )}
    </View>
  );
};

export default Photo;

const width = Layout.window.width - 40;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
