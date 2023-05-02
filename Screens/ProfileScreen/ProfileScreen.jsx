import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  Text,
  Pressable,
  ScrollView,
} from "react-native";

import LogOut from "../../assets/images/svg/logOut.svg";
import Message from "../../assets/images/svg/message.svg";
import MessageOrange from "../../assets/images/svg/messageOrange.svg";
import Location from "../../assets/images/svg/location.svg";
import ThumbsUp from "../../assets/images/svg/thumbsUp.svg";

import { confirmationAlert } from "../../components/feedback/ConfirmationAlert";

import postsStyles from "../PostsScreen/PostsScreen";
import {
  postCommentsCountActive,
  postCommentsCountInactive,
} from "../PostsScreen/PostsScreen";

export const ProfileScreen = (props) => {
  const { login, image } = props.route.params;

  const [username] = useState(login ?? "Username");
  const [newImage, setNewImage] = useState(image ?? null);
  const [pictures] = useState(props.pictures ?? []);

  const pickImage = async () => {
    if (newImage) {
      return setImage(null);
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setNewImage(result.assets[0].uri);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/background.jpg")}
        style={styles.image}
      >
        <View style={styles.whiteBox}>
          <Pressable style={styles.logOutButton} onPress={confirmationAlert}>
            <LogOut />
          </Pressable>
          <Image
            style={styles.avatarImage}
            source={
              newImage
                ? { uri: newImage }
                : require("../../assets/images/emptyAvatar.jpg")
            }
          />
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.addButton}
            onPress={pickImage}
          >
            <Image
              style={styles.addButtonIcon}
              source={
                newImage
                  ? require("../../assets/images/delete.png")
                  : require("../../assets/images/add.png")
              }
            />
          </TouchableOpacity>
          <Text style={styles.nameText}>{username}</Text>
          <View style={styles.list}>
            {pictures.length > 0 ? (
              pictures.map((item) => (
                <View key={item?.id} style={postsStyles.postWrap}>
                  <Image
                    style={postsStyles.postImage}
                    source={{ uri: item?.image }}
                  />
                  <Text style={postsStyles.postTitle}>{item?.imageTitle}</Text>
                  <View style={postsStyles.postBottomWrap}>
                    <View style={postsStyles.postBottomLikeslWrap}>
                      <View style={postsStyles.postBottomSmallWrap}>
                        {item?.comments?.length > 0 ? (
                          <MessageOrange />
                        ) : (
                          <Message />
                        )}
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
                        <View style={postsStyles.postBottomSmallWrap}>
                          <ThumbsUp />
                          <Text style={postCommentsCountActive}>
                            item?.likesCount
                          </Text>
                        </View>
                      )}
                    </View>
                    <View style={postsStyles.postBottomSmallWrap}>
                      <Location />
                      <Text style={postsStyles.postLocation}>
                        {item?.location}
                      </Text>
                    </View>
                  </View>
                </View>
              ))
            ) : (
              <Text style={postsStyles.loginText}>
                Пока тут пусто, самое время добавить своё первое фото!
              </Text>
            )}
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    paddingTop: 147,
  },
  whiteBox: {
    paddingTop: 24,
    paddingHorizontal: 16,
    minHeight: 549,
    width: "100%",
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  avatarImage: {
    width: 120,
    height: 120,
    position: "absolute",
    top: -60,
    borderRadius: 16,
  },
  addButton: {
    position: "absolute",
    top: 20,
    right: 108,
  },
  addButtonIcon: {
    width: 25,
    backgroundColor: "#fff",
    borderRadius: 50,
  },
  nameText: {
    fontFamily: "Roboto-Bold",
    fontSize: 30,
    lineHeight: 35,
    color: "#212121",
    marginBottom: 33,
  },
  logOutButton: {
    alignSelf: "flex-end",
    marginBottom: 48,
  },
  list: {
    width: "100%",
  },
});
