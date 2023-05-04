import { useEffect, useRef, useState } from "react";

import { posts } from "../../mock_db/posts";

import {
  View,
  Image,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  FlatList,
} from "react-native";

import ArrowUp from "../../assets/images/svg/arrowUp.svg";

import { adjustTime } from "../../helpers/timeAdjustment";

import {
  commentTime,
  emptyAvatar,
  friendDateWrap,
  commentTextWrap,
  friendCommentTextWrap,
} from "./CommentsScreenStyles";
import styles from "./CommentsScreenStyles";

export const CommentsScreen = (props) => {
  const { picture, avatar, login } = props.route.params;

  const [commentsArr, setCommentsArr] = useState(picture.comments ?? []);
  const [userAvatar] = useState(avatar ?? "");
  const [username] = useState(login);
  const [userComment, setUserComment] = useState("");

  const flatlistRef = useRef(null);

  useEffect(() => {
    const pictureToShow = posts.find((post) => post.image === picture);
    setCommentsArr(pictureToShow.comments);
    console.log(picture);
  }, []);

  const sendComment = () => {
    const date = Date.now();

    if (userComment === "") return;
    const commentToAdd = {
      id: Date.now(),
      userAvatar,
      user: login,
      comment: userComment,
      createdAt: adjustTime(date),
    };
    setCommentsArr([...commentsArr, commentToAdd]);

    const postIdx = posts.findIndex((post) => post.image === picture);
    posts[postIdx].comments.push(commentToAdd);
    setUserComment("");
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <View style={styles.innerContainer}>
            <Image style={styles.postImage} source={{ uri: picture }} />
            <FlatList
              style={{ flex: 1 }}
              ref={flatlistRef}
              onContentSizeChange={() => flatlistRef.current.scrollToEnd({})}
              data={commentsArr}
              renderItem={({ item }) => (
                <View
                  style={
                    item.user === username
                      ? styles.commentContainer
                      : styles.friendCommentsContainer
                  }
                >
                  {item.userAvatar ? (
                    <Image
                      style={styles.avatar}
                      source={{ uri: item.userAvatar }}
                    />
                  ) : (
                    <View style={emptyAvatar} />
                  )}
                  <View
                    style={
                      item.user === username
                        ? commentTextWrap
                        : friendCommentTextWrap
                    }
                  >
                    <Text style={styles.commentText}>{item.comment}</Text>
                    <View
                      style={
                        item.user === login ? styles.dateWrap : friendDateWrap
                      }
                    >
                      <Text style={styles.commentDate}>
                        {item.createdAt.split(" ").slice(0, 3).join(" ")}
                      </Text>
                      <Text style={commentTime}>
                        {item.createdAt.split(" ").slice(-2).join(":")}
                      </Text>
                    </View>
                  </View>
                </View>
              )}
              keyExtractor={(item) => item.id}
            />
            <TextInput
              style={styles.input}
              value={userComment}
              placeholder="Комментировать..."
              cursorColor={"transparent"}
              underlineColorAndroid={"#F6F6F6"}
              onChangeText={(text) => setUserComment(text)}
            />
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.8}
              onPress={sendComment}
            >
              <ArrowUp />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};
