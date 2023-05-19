import { useState, useEffect, useRef } from "react";

import { useNavigation } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";

import {
  Image,
  View,
  Text,
  FlatList,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import { auth } from "../../firebase/config";
import { onAuthStateChanged } from "firebase/auth";

import { useSelector, useDispatch } from "react-redux";
import {
  fetchAllPosts,
  addLikeToPost,
} from "../../redux/posts/postsOperations";

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
  const posts = useSelector((state) => state.posts.posts);
  const [userEmail, setUserEmail] = useState("");
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [avatar, setAvatar] = useState("");

  const flatListRef = useRef(null);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.isLoading);
  const isLoadingPosts = useSelector((state) => state.posts.isLoading);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
        setUsername(user.displayName);
        setAvatar(user.photoURL);
        setUserId(user.uid);
      } else {
        navigation.goBack();
      }
    });

    if (isFocused) {
      dispatch(fetchAllPosts());
      scrollToTop();
    }
  }, [isFocused]);

  const scrollToTop = () => {
    flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
  };

  const sortedPosts = posts.slice().sort((a, b) => b.id - a.id);

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
      {isLoadingPosts ? (
        <ActivityIndicator size="large" color="#FF6C00" />
      ) : (
        <FlatList
          ref={flatListRef}
          style={{ flex: 1 }}
          keyboardShouldPersistTaps="always"
          data={sortedPosts}
          ListHeaderComponent={() => <View style={{ height: 0 }} />}
          ListEmptyComponent={
            <Text style={styles.loginText}>
              Пока тут пусто, самое время найти друзей и добавить своё первое
              фото!
            </Text>
          }
          renderItem={({ item }) => {
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
                    {item.likes.length > 0 ? (
                      item.likes.includes(userId) ? (
                        <View style={styles.postBottomSmallWrap}>
                          <ThumbsUp />
                          <Text style={postCommentsCountActive}>
                            {item.likes.length}
                          </Text>
                        </View>
                      ) : (
                        <TouchableOpacity
                          onPress={() => {
                            dispatch(
                              addLikeToPost({ user: userId, id: item.id })
                            );
                          }}
                        >
                          <View style={styles.postBottomSmallWrap}>
                            <ThumbsUp />
                            <Text style={postCommentsCountActive}>
                              {item.likes.length}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      )
                    ) : item.likes.includes(userId) ? (
                      <View style={styles.postBottomSmallWrap}>
                        <ThumbsUpGrey />
                        <Text style={postCommentsCountInactive}>
                          {item.likes.length}
                        </Text>
                      </View>
                    ) : (
                      <TouchableOpacity
                        onPress={() => {
                          dispatch(
                            addLikeToPost({ user: userId, id: item.id })
                          );
                        }}
                      >
                        <View style={styles.postBottomSmallWrap}>
                          <ThumbsUpGrey />
                          <Text style={postCommentsCountInactive}>
                            {item.likes.length}
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
      )}
    </View>
  );
};
