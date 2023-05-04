import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
  