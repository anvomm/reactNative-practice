import { useState, useEffect } from "react";

import { Image, StyleSheet, View, Text, FlatList } from "react-native";

import Message from "../../assets/images/svg/message.svg";
import Location from "../../assets/images/svg/location.svg";

export const PostsScreen = ({ navigation, route }) => {
  const { login, email, image, picture } = route.params;
  console.log(route.params);

  const [userEmail] = useState(email);
  const [username] = useState(login);
  const [avatar] = useState(image);
  let [pictures, setPictures] = useState([]);

  useEffect(() => {
    if ("picture" in route.params) {
      setPictures([...pictures, { ...picture, id: pictures.length }]);
    }
  }, [picture]);

  return (
    <View style={styles.container}>
      <View style={styles.contactsWrap}>
        <Image
          style={styles.image}
          source={
            avatar
              ? { uri: avatar }
              : require("../../assets/images/emptyAvatar.jpg")
          }
        />
        <View>
          <Text style={styles.loginText}>{username ?? "User login"}</Text>
          <Text style={styles.emailText}>{userEmail}</Text>
        </View>
      </View>
      {pictures.length > 0 && (
        <FlatList
          data={pictures}
          ListEmptyComponent={<View></View>}
          renderItem={({ item }) => (
            <View style={styles.postWrap}>
              <Image style={styles.postImage} source={{ uri: item?.image }} />
              <Text style={styles.postTitle}>{item?.imageTitle}</Text>
              <View style={styles.postBottomWrap}>
                <View style={styles.postBottomSmallWrap}>
                  <Message />
                  <Text style={styles.postCommentsCount}>
                    {item?.comments?.length ?? 0}
                  </Text>
                </View>
                <View style={styles.postBottomSmallWrap}>
                  <Location />
                  <Text style={styles.postLocation}>{item?.location}</Text>
                </View>
              </View>
            </View>
          )}
          keyExtractor={(item) => item?.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 16,
  },
  contactsWrap: {
    marginBottom: 32,
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  loginText: {
    fontFamily: "Roboto-700",
    fontWeight: 700,
    fontSize: 13,
    lineHeight: 16,
    color: "#212121",
  },
  emailText: {
    color: "rgba(33, 33, 33, 0.8)",
  },
  postImage: {
    width: "100%",
    height: 240,
    borderRadius: 8,
    marginBottom: 8,
  },
  postTitle: {
    marginBottom: 11,
    fontFamily: "Roboto-Bold",
    fontSize: 16,
    lineHeight: 18.75,
    color: "#212121",
  },
  postCommentsCount: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 18.75,
    color: "#BDBDBD",
  },
  postLocation: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 18.75,
    color: "#212121",
    textDecorationLine: "underline",
  },
  postBottomWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  postBottomSmallWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  postWrap: {
    marginBottom: 34,
  },
});
