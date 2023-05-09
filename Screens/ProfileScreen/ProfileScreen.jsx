import { useState, useRef, useEffect } from "react";

import { posts } from "../../mock_db/posts";

import * as ImagePicker from "expo-image-picker";

import {
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  Text,
  Pressable,
  ScrollView,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import LogOut from "../../assets/images/svg/logOut.svg";
import Message from "../../assets/images/svg/message.svg";
import MessageOrange from "../../assets/images/svg/messageOrange.svg";
import Location from "../../assets/images/svg/location.svg";
import ThumbsUp from "../../assets/images/svg/thumbsUp.svg";
import ThumbsUpGrey from "../../assets/images/svg/thumbsUpGrey.svg";

import { confirmationAlert } from "../../components/feedback/ConfirmationAlert";

import { styles } from "./ProfileScreenStyles";
import postsStyles from "../PostsScreen/PostsScreenStyles";
import {
  postCommentsCountActive,
  postCommentsCountInactive,
} from "../PostsScreen/PostsScreenStyles";

export const ProfileScreen = (props) => {
  const { email, login, image } = props.route.params;

  const [username] = useState(login ?? "Username");
  const [newImage, setNewImage] = useState(image ?? null);

  const pictures = posts.filter((post) => post.owner === email);

  const ref = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.addListener("focus", () => {
      scrollTop();
    });
  }, []);

  const scrollTop = () => {
    if (ref.current) {
      ref.current.scrollTo({ x: 0, y: 0, animated: true });
    }
  };

  const pickImage = async () => {
    if (newImage) {
      return setNewImage(null);
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      props.changeAvatar(result.assets[0].uri);
      setNewImage(result.assets[0].uri);
    }
  };

  return (
    <ScrollView ref={ref} scrollsToTop={true} style={styles.container}>
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
                      {item?.likes > 0 ? (
                        <View style={postsStyles.postBottomSmallWrap}>
                          <ThumbsUp />
                          <Text style={postCommentsCountActive}>
                            {item?.likes}
                          </Text>
                        </View>
                      ) : (
                        <View style={postsStyles.postBottomSmallWrap}>
                          <ThumbsUpGrey />
                          <Text style={postCommentsCountInactive}>
                            {item?.likes}
                          </Text>
                        </View>
                      )}
                    </View>
                    <Pressable
                      style={postsStyles.postBottomSmallWrap}
                      onPress={() =>
                        navigation.navigate("Map", {
                          latitude: item.coords.lat,
                          longitude: item.coords.long,
                        })
                      }
                    >
                      <Location />
                      <Text style={postsStyles.postLocation}>
                        {item?.location}
                      </Text>
                    </Pressable>
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
