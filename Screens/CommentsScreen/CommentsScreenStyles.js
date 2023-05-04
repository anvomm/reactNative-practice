import { StyleSheet } from "react-native";

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
    width: "86%",
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
  commentContainer: {
    flexDirection: "row-reverse",
    gap: 16,
  },
  friendCommentsContainer: {
    flexDirection: "row",
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
  },
});

export const commentTime = StyleSheet.compose(styles.commentDate, {
  borderLeftColor: "#BDBDBD",
  borderLeftWidth: 1,
  paddingLeft: 3,
});

export const emptyAvatar = StyleSheet.compose(styles.avatar, {
  backgroundColor: "#F6F6F6",
});

export const friendDateWrap = StyleSheet.compose(styles.dateWrap, {
  alignSelf: "flex-end",
});

export const commentTextWrap = StyleSheet.compose(styles.commentTextWrap, {
  borderTopLeftRadius: 6,
});

export const friendCommentTextWrap = StyleSheet.compose(
  styles.commentTextWrap,
  { borderTopRightRadius: 6 }
);

export default styles;
