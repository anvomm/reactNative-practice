import { useState } from "react";

import { StyleSheet, View, Image, Text, TextInput, TouchableWithoutFeedback, Keyboard, } from "react-native";

import Location from "../../assets/images/svg/location.svg";

export const CreatePostsScreen = () => {
  const [image, setImage] = useState(null);
  const [imageTitle, setImageTitle] = useState("");
  const [location, setLocation] = useState("");

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={
          image
            ? { uri: image }
            : require("../../assets/images/emptyPostImage.png")
        }
      />
      <Text style={styles.text}>Загрузите фото</Text>
      <TextInput
        value={imageTitle}
        style={styles.input}
        placeholder="Название..."
        placeholderTextColor="#BDBDBD"
        
        onChangeText={(text) => setImageTitle(text)}
      />
      <View>
      <Location style={styles.icon} />
      <TextInput
        value={location}
        style={locationInputStyle}
        placeholder="Местность..."
        placeholderTextColor="#BDBDBD"
        
        onChangeText={(text) => setLocation(text)}
      />
      </View>
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
  },
  image: {
    marginBottom: 8,
    width: "100%",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E8E8E8",
  },
  text: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 18.75,
    color: "#BDBDBD",
  },
  input: {
    marginTop: 22,
    paddingVertical: 15,
    borderBottomColor: "#E8E8E8",
    borderBottomWidth: 1,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 18.75,
  },
  padding: {
    paddingLeft: 26,
  },
  icon: {
    position: "absolute",
    bottom: 17,

  }
});

const locationInputStyle = StyleSheet.compose(styles.input, styles.padding);