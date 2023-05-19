import { useState, useRef, useEffect } from "react";

import * as ImagePicker from "expo-image-picker";

import {
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  Text,
  Pressable,
  ScrollView,
  Alert,
} from "react-native";

import { auth } from "../../firebase/config";
import { onAuthStateChanged } from "firebase/auth";

import { useNavigation } from "@react-navigation/native";

import { useDispatch, useSelector } from "react-redux";
import { updateAvatar, logoutUser } from "../../redux/auth/authOperations";

import LogOut from "../../assets/images/svg/logOut.svg";
import Message from "../../assets/images/svg/message.svg";
import MessageOrange from "../../assets/images/svg/messageOrange.svg";
import Location from "../../assets/images/svg/location.svg";
import ThumbsUp from "../../assets/images/svg/thumbsUp.svg";
import ThumbsUpGrey from "../../assets/images/svg/thumbsUpGrey.svg";

import { styles } from "./ProfileScreenStyles";
import postsStyles from "../postsScreen/PostsScreenStyles";
import {
  postCommentsCountActive,
  postCommentsCountInactive,
} from "../postsScreen/PostsScreenStyles";

export const ProfileScreen = () => {
  const [username, setUsername] = useState("Username");
  const [avatar, setAvatar] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [picturesOwner, setPicturesOwner] = useState("");

  const posts = useSelector((state) => state.posts.posts);

  const ref = useRef(null);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    navigation.addListener("focus", () => {
      scrollTop();
    });

    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
        setUsername(user.displayName);
        setAvatar(user.photoURL);
        setPicturesOwner(user.uid);
      } else {
        navigation.goBack();
      }
    });
  }, []);

  const pictures = posts.filter((post) => post.owner === picturesOwner);

  const scrollTop = () => {
    if (ref.current) {
      ref.current.scrollTo({ x: 0, y: 0, animated: true });
    }
  };

  const confirmLogout = () =>
    Alert.alert("Вы уверены, что хотите выйти?", "", [
      {
        text: "Отменить",
        style: "cancel",
      },
      {
        text: "Выйти",
        onPress: () => {
          dispatch(logoutUser());
          navigation.navigate("Login");
        },
      },
    ]);

  const pickImage = async () => {
    if (avatar) {
      return setAvatar(null);
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const photoURL = result.assets[0].uri;
      dispatch(updateAvatar(photoURL));
    }
  };

  return (
    <ScrollView ref={ref} scrollsToTop={true} style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/background.jpg")}
        style={styles.image}
      >
        <View style={styles.whiteBox}>
          <Pressable style={styles.logOutButton} onPress={confirmLogout}>
            <LogOut />
          </Pressable>
          <Image
            style={styles.avatarImage}
            source={
              avatar
                ? { uri: avatar }
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
                avatar
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
                      {item?.likes.length > 0 ? (
                        <View style={postsStyles.postBottomSmallWrap}>
                          <ThumbsUp />
                          <Text style={postCommentsCountActive}>
                            {item?.likes.length}
                          </Text>
                        </View>
                      ) : (
                        <View style={postsStyles.postBottomSmallWrap}>
                          <ThumbsUpGrey />
                          <Text style={postCommentsCountInactive}>
                            {item?.likes.length}
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
