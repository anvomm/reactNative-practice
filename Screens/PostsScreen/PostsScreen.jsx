import { useState, useEffect } from "react";

import { Image, StyleSheet, View, Text } from "react-native";

export const PostsScreen = ({ navigation, route }) => {
  const { login, email, image, picture } = route.params;

  const [userEmail] = useState(email);
  const [username] = useState(login);
  const [avatar] = useState(image);
  const [pictures, setPictures] = useState([]);

  useEffect(() => {
    setPictures([...pictures, picture]);
  }, [picture]);

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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
    paddingHorizontal: 16,
    paddingVertical: 32,
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
});
