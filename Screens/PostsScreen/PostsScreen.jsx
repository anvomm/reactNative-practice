import { useState, useEffect, useRef } from "react";

import {
  Image,
  StyleSheet,
  View,
  Text,
  FlatList,
  Pressable,
} from "react-native";

import Message from "../../assets/images/svg/message.svg";
import MessageOrange from "../../assets/images/svg/messageOrange.svg";
import Location from "../../assets/images/svg/location.svg";
import ThumbsUp from "../../assets/images/svg/thumbsUp.svg";

export const PostsScreen = ({ navigation, route }) => {
  const { login, email, image, picture } = route.params;

  console.log(route.params)

  const [userEmail] = useState(email);
  const [username] = useState(login);
  const [avatar] = useState(image);
  const [pictures, setPictures] = useState([]);

  const flatListRef = useRef(null);

  useEffect(() => {
    navigation.addListener("focus", () => {
      scrollToTop();
    });

    if ("picture" in route.params) {
      setPictures([{ ...picture, id: pictures.length }, ...pictures]);
    }
  }, [picture]);

  const scrollToTop = () => {
    flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
  };

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
      <FlatList
        ref={flatListRef}
        style={{ flex: 1 }}
        data={pictures}
        ListHeaderComponent={() => <View style={{ height: 0 }} />}
        ListEmptyComponent={
          <Text style={styles.loginText}>
            Пока тут пусто, самое время добавить своё первое фото!
          </Text>
        }
        renderItem={({ item }) => (
          <View style={styles.postWrap}>
            <Image style={styles.postImage} source={{ uri: item?.image }} />
            <Text style={styles.postTitle}>{item?.imageTitle}</Text>
            <View style={styles.postBottomWrap}>
              <View style={styles.postBottomLikeslWrap}>
                <View style={styles.postBottomSmallWrap}>
                  <Pressable onPress={() => navigation.navigate("Comments", {picture: item.image})}>
                    {item?.comments?.length > 0 ? (
                      <MessageOrange />
                    ) : (
                      <Message />
                    )}
                  </Pressable>
                  <Text
                    style={
                      item?.comments?.length > 0
                        ? postCommentsCountActive
                        : postCommentsCountInactive
                    }
                  >
                    {item?.comments?.length ?? 0}
                  </Text>
                </View>
                {item?.likesCount > 0 && (
                  <View style={styles.postBottomSmallWrap}>
                    <ThumbsUp />
                    <Text style={postCommentsCountActive}>
                      item?.likesCount
                    </Text>
                  </View>
                )}
              </View>

              <Pressable
                style={styles.postBottomSmallWrap}
                onPress={() => navigation.navigate("Map")}
              >
                <Location />
                <Text style={styles.postLocation}>{item?.location}</Text>
              </Pressable>
            </View>
          </View>
        )}
        keyExtractor={(item) => item?.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
    paddingHorizontal: 16,
    paddingTop: 32,
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
  },
  grey: {
    color: "#BDBDBD",
  },
  black: {
    color: "#212121",
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
  postBottomLikeslWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 27,
  },
});

export const postCommentsCountInactive = StyleSheet.compose(
  styles.postCommentsCount,
  styles.grey
);
export const postCommentsCountActive = StyleSheet.compose(
  styles.postCommentsCount,
  styles.black
);

export default styles;
