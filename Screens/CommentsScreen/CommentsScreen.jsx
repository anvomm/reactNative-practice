import { useState } from "react";

import {
  StyleSheet,
  View,
  Image,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity
} from "react-native";

import ArrowUp from "../../assets/images/svg/arrowUp.svg";

export const CommentsScreen = ({ navigation, route }) => {
  const { picture } = route.params;
  const [comment, setComment] = useState("");
  console.log(picture);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Image style={styles.postImage} source={{ uri: picture }} />
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <TextInput
            style={styles.input}
            value={comment}
            placeholder="Комментировать..."
            onChangeText={(text) => setComment(text)}
          />
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
          >
            <ArrowUp />

          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
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
    marginBottom: 8,
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
    right: 10,
    bottom: 15,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF6C00",
    borderRadius: 50,
  }
});
