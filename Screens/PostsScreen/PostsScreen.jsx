import { Image, StyleSheet, View, Text } from "react-native";

export const PostsScreen = ({ navigation, route }) => {
  const { login, email, image } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.contactsWrap}>
        <Image style={styles.image} source={
                image
                  ? { uri: image }
                  : require("../../assets/images/emptyAvatar.jpg")} />
        <View>
          <Text style={styles.loginText}>{login ?? "User login"}</Text>
          <Text style={styles.emailText}>{email}</Text>
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
  }
});
