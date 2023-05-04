import { StyleSheet } from "react-native";

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
  