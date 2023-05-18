import { useState, useEffect, useRef } from "react";

import { posts } from "../../mock_db/posts";

import { useNavigation } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";

import {
  Image,
  View,
  Text,
  FlatList,
  Pressable,
  TouchableOpacity,
} from "react-native";

import { auth } from "../../firebase/config";
import { onAuthStateChanged } from "firebase/auth";

import { useSelector } from "react-redux";

import Message from "../../assets/images/svg/message.svg";
import MessageOrange from "../../assets/images/svg/messageOrange.svg";
import Location from "../../assets/images/svg/location.svg";
import ThumbsUp from "../../assets/images/svg/thumbsUp.svg";
import ThumbsUpGrey from "../../assets/images/svg/thumbsUpGrey.svg";

import styles from "./PostsScreenStyles";
import {
  postCommentsCountActive,
  postCommentsCountInactive,
} from "./PostsScreenStyles";

export const PostsScreen = () => {
  
  const [userEmail, setUserEmail] = useState("");
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");
  const [pictures, setPictures] = useState(posts || []);
  const [needToUpdate, setNeedToUpdate] = useState(false);
  const [pressedStates, setPressedStates] = useState(
    new Array(pictures.length).fill(false)
  );

  const flatListRef = useRef(null);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const isLoading = useSelector((state) => state.auth.isLoading);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
        setUsername(user.displayName);
        setAvatar(user.photoURL);
      }
      else {
        navigation.goBack();
        return;
      }
    });

    if (isFocused) {
      setPictures(posts);
      setPressedStates([false, ...pressedStates]);
      scrollToTop();
    }
  }, [isFocused]);

  const scrollToTop = () => {
    flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
  };
  const handlePress = (index) => {
    if (!pressedStates[index]) {
      const updatedPressedStates = [...pressedStates];
      updatedPressedStates[index] = true;
      setPressedStates(updatedPressedStates);
    }
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
        keyboardShouldPersistTaps="always"
        data={pictures}
        ListHeaderComponent={() => <View style={{ height: 0 }} />}
        ListEmptyComponent={
          <Text style={styles.loginText}>
            Пока тут пусто, самое время найти друзей и добавить своё первое
            фото!
          </Text>
        }
        renderItem={({ item, index }) => {
          return (
            <View style={styles.postWrap}>
              <Image style={styles.postImage} source={{ uri: item?.image }} />
              <Text style={styles.postTitle}>{item?.imageTitle}</Text>
              <View style={styles.postBottomWrap}>
                <View style={styles.postBottomLikeslWrap}>
                  <View style={styles.postBottomSmallWrap}>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("Comments", {
                          picture: item.image,
                          avatar: avatar,
                          login: username,
                        });
                      }}
                    >
                      {item?.comments.length > 0 ? (
                        <MessageOrange />
                      ) : (
                        <Message />
                      )}
                    </TouchableOpacity>
                    <Text
                      style={
                        item?.comments.length > 0
                          ? postCommentsCountActive
                          : postCommentsCountInactive
                      }
                    >
                      {item?.comments.length ?? 0}
                    </Text>
                  </View>
                  {item.likes > 0 ? (
                    pressedStates[index] ? (
                      <View style={styles.postBottomSmallWrap}>
                        <ThumbsUp />
                        <Text style={postCommentsCountActive}>
                          {item.likes}
                        </Text>
                      </View>
                    ) : (
                      <TouchableOpacity
                        onPress={() => {
                          handlePress(index);
                          const idx = posts.findIndex(
                            (post) => post.image === item.image
                          );
                          posts[idx].likes += 1;
                          setNeedToUpdate(!needToUpdate);
                        }}
                      >
                        <View style={styles.postBottomSmallWrap}>
                          <ThumbsUp />
                          <Text style={postCommentsCountActive}>
                            {item.likes}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    )
                  ) : pressedStates[index] ? (
                    <View style={styles.postBottomSmallWrap}>
                      <ThumbsUpGrey />
                      <Text style={postCommentsCountInactive}>
                        {item.likes}
                      </Text>
                    </View>
                  ) : (
                    <TouchableOpacity
                      onPress={() => {
                        handlePress(index);
                        const idx = posts.findIndex(
                          (post) => post.image === item.image
                        );
                        posts[idx].likes += 1;
                        setNeedToUpdate(!needToUpdate);
                      }}
                    >
                      <View style={styles.postBottomSmallWrap}>
                        <ThumbsUpGrey />
                        <Text style={postCommentsCountInactive}>
                          {item.likes}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )}
                </View>

                <Pressable
                  style={styles.postBottomSmallWrap}
                  onPress={() =>
                    navigation.navigate("Map", {
                      latitude: item.coords.lat,
                      longitude: item.coords.long,
                    })
                  }
                >
                  <Location />
                  <Text style={styles.postLocation}>{item?.location}</Text>
                </Pressable>
              </View>
            </View>
          );
        }}
        keyExtractor={(item) => item?.id}
      />
    </View>
  );
};
