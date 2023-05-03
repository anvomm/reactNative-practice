import { useState } from "react";

import {
  StyleSheet,
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

export const CommentsScreen = (props) => {
  const { picture, avatar, login } = props.route.params;

  const [commentsArr, setCommentsArr] = useState(picture.comments ?? []);
  const [userAvatar, setUserAvatar] = useState(avatar);
  const [username, setUsername] = useState(login);
  const [userComment, setUserComment] = useState("");

  const sendComment = () => {
    const date = Date.now();

    if (userComment === "") return;
    const commentToAdd = {
      id: Date.now(),
      user: { userAvatar, username },
      comment: userComment,
      createdAt: adjustTime(date),
    };
    setCommentsArr([...commentsArr, commentToAdd]);
    const pictureWithUpdatedComments = {...picture, commentsCount: picture.commentsCount + 1, comments: commentsArr};
    setUserComment("");
    /* props.updatePicture(pictureWithUpdatedComments);
    setUserComment(""); */
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
              data={commentsArr}
              renderItem={({ item }) => (
                <View style={styles.commentContainer}>
                  {item.user.userAvatar ? <Image
                    style={styles.avatar}
                    source={{ uri: item.user.userAvatar }}
                  />: <View style={emptyAvatar}/>}
                  <View style={styles.commentTextWrap}>
                    <Text style={styles.commentText}>{item.comment}</Text>
                    <View style={styles.dateWrap}>
                    <Text style={styles.commentDate}>{item.createdAt.split(" ").slice(0,3).join(" ")}</Text>
                    <Text style={commentTime}>{item.createdAt.split(" ").slice(-2).join(":")}</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
    paddingHorizontal: 16,
    paddingVertical: 32,
    justifyContent: "space-between",
  },
  postImage: {
    width: "100%",
    height: 240,
    borderRadius: 8,
    marginBottom: 32,
  },
  input: {
    padding: 15,
    borderColor: "#E8E8E8",
    borderWidth: 1,
    borderRadius: 100,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 18.75,
    color: "#212121",
    backgroundColor: "#F6F6F6",
  },
  button: {
    width: 34,
    height: 34,
    position: "absolute",
    right: 25,
    bottom: 45,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF6C00",
    borderRadius: 50,
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 50,
  },
  commentText: {
    marginBottom: 8,
    flex: 1,
    flexWrap: "wrap",
    maxWidth: "100%",
    fontFamily: "Roboto-Regular",
    fontSize: 13,
    lineHeight: 18,
    color: "#212121",
  },
  commentTextWrap: {
    marginBottom: 24,
    padding: 16,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    width: "85%",
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    borderTopLeftRadius: 6,
  },
  commentContainer: {
    flexDirection: "row-reverse",
    gap: 16,
  },
  commentDate: {
    fontFamily: "Roboto-Regular",
    fontSize: 10,
    lineHeight: 11,
    color: "#BDBDBD",
  },
  dateWrap: {
    flexDirection: "row",
    gap: 3,
  }
});

const commentTime = StyleSheet.compose(styles.commentDate, {borderLeftColor: "#BDBDBD", borderLeftWidth: 1, paddingLeft: 3});

const emptyAvatar = StyleSheet.compose(styles.avatar, {backgroundColor: "#F6F6F6"})
