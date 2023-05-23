import { useEffect, useRef, useState } from "react";

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

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/config";

import { useDispatch, useSelector } from "react-redux";
import { addCommentToPost } from "../../redux/posts/postsOperations";

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
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUserAvatar(user.photoURL);
      setUserId(user.uid);
    }
  });

  const posts = useSelector((state) => state.posts.posts);
  const { picture } = props.route.params;

  const [commentsArr, setCommentsArr] = useState(posts.comments ?? []);
  const [userAvatar, setUserAvatar] = useState("");
  const [pictreOwner, setPictreOwner] = useState("");
  const [userId, setUserId] = useState("");
  const [userComment, setUserComment] = useState("");

  const flatlistRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const pictureToShow = posts.find((post) => post.image === picture);
    setPictreOwner(pictureToShow.owner);
    setCommentsArr(pictureToShow.comments);
  }, []);

  const sendComment = () => {
    const date = Date.now();

    if (userComment === "") return;
    const commentToAdd = {
      id: Date.now(),
      userAvatar,
      user: userId,
      comment: userComment,
      createdAt: adjustTime(date),
    };
    setCommentsArr([...commentsArr, commentToAdd]);

    const id = posts.find((post) => post.image === picture).id;

    dispatch(addCommentToPost({ comment: commentToAdd, id }));
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
            {commentsArr.length > 0 && (
              <FlatList
                style={{ flex: 1 }}
                ref={flatlistRef}
                onContentSizeChange={() => flatlistRef.current.scrollToEnd({})}
                data={commentsArr}
                renderItem={({ item }) => (
                  <View
                    style={
                      item.user === pictreOwner
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
                        item.user === pictreOwner
                          ? commentTextWrap
                          : friendCommentTextWrap
                      }
                    >
                      <Text style={styles.commentText}>{item.comment}</Text>
                      <View
                        style={
                          item.user === pictreOwner
                            ? styles.dateWrap
                            : friendDateWrap
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
            )}
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
