import { useState } from "react";

import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";

import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  TouchableOpacity,
  Alert,
} from "react-native";

import Location from "../../assets/images/svg/location.svg";
import Trash from "../../assets/images/svg/trash.svg";
import Camera from "../../assets/images/svg/camera.svg";
import CameraWhite from "../../assets/images/svg/cameraWhite.svg";

export const CreatePostsScreen = ({ addPicture, adjustTabsOrder }) => {
  const [image, setImage] = useState(null);
  const [imageTitle, setImageTitle] = useState("");
  const [location, setLocation] = useState("");

  const navigation = useNavigation();

  const pickImage = async () => {
    if (image) {
      return setImage(null);
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const allTheDataInserted = image && location && imageTitle;

  const onSave = () => {
    if (!allTheDataInserted) {
      return Alert.alert("Please fill in all the fields!");
    }
    addPicture({ image, imageTitle, location });
    adjustTabsOrder(1);
    navigation.navigate("Posts", { picture: { image, imageTitle, location } });
    onDelete();
  };

  const onDelete = () => {
    setImage(null);
    setLocation("");
    setImageTitle("");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View>
          <View style={styles.imageWrap}>
            <TouchableOpacity
              activeOpacity={0.5}
              style={image ? addImageButtonOnImageStyle : styles.addImageButton}
              onPress={pickImage}
            >
              {image ? <CameraWhite /> : <Camera />}
            </TouchableOpacity>
            <Image
              style={styles.image}
              source={
                image
                  ? { uri: image }
                  : require("../../assets/images/emptyPostImage.png")
              }
            />
          </View>
          <Text style={styles.text}>
            {image ? "Редактировать фото" : "Загрузите фото"}
          </Text>
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <TextInput
              value={imageTitle}
              style={imageTitle ? titleInputStyle : styles.input}
              selectionColor={"transparent"}
              activeUnderlineColor="#fff"
              underlineColorAndroid="#fff"
              placeholder="Название..."
              placeholderTextColor="#BDBDBD"
              onChangeText={(text) => setImageTitle(text)}
            />
            <View>
              <Location style={styles.icon} />
              <TextInput
                value={location}
                style={locationInputStyle}
                selectionColor={"transparent"}
                activeUnderlineColor="#fff"
                underlineColorAndroid="#fff"
                placeholder="Местность..."
                placeholderTextColor="#BDBDBD"
                onChangeText={(text) => setLocation(text)}
              />
            </View>
          </KeyboardAvoidingView>
          <Pressable
            style={allTheDataInserted ? buttonActiveStyle : buttonInactiveStyle}
            onPress={onSave}
          >
            <Text
              style={
                allTheDataInserted
                  ? buttonActiveTextStyle
                  : buttonInactiveTextStyle
              }
            >
              Опубликовать
            </Text>
          </Pressable>
        </View>
        <Pressable style={styles.deleteButton} onPress={onDelete}>
          <Trash />
        </Pressable>
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
  image: {
    marginBottom: 8,
    width: "100%",
    height: 240,
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
    color: "#212121",
  },
  padding: {
    paddingLeft: 26,
  },
  boldText: {
    fontFamily: "Roboto-Bold",
  },
  icon: {
    position: "absolute",
    bottom: 17,
  },
  button: {
    width: "100%",
    padding: 16,
    marginTop: 32,
    borderRadius: 100,
  },
  buttonInactive: {
    backgroundColor: "#F6F6F6",
  },
  buttonActive: {
    backgroundColor: "#FF6C00",
  },
  buttonText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 18.75,
    textAlign: "center",
  },
  buttonActiveText: {
    color: "#fff",
  },
  buttonInactiveText: {
    color: "#BDBDBD",
  },
  deleteButton: {
    alignSelf: "center",
    width: 70,
    height: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
  },
  addImageButton: {
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
    width: 60,
    height: 60,
    backgroundColor: "#fff",
    borderRadius: 50,
  },
  addImageButtonWithOpacity: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  imageWrap: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
});

const locationInputStyle = StyleSheet.compose(styles.input, styles.padding);
const titleInputStyle = StyleSheet.compose(styles.input, styles.boldText);
const buttonInactiveTextStyle = StyleSheet.compose(
  styles.buttonText,
  styles.buttonInactiveText
);
const buttonActiveTextStyle = StyleSheet.compose(
  styles.buttonText,
  styles.buttonActiveText
);
const addImageButtonOnImageStyle = StyleSheet.compose(
  styles.addImageButton,
  styles.addImageButtonWithOpacity
);
const buttonInactiveStyle = StyleSheet.compose(
  styles.button,
  styles.buttonInactive
);
const buttonActiveStyle = StyleSheet.compose(
  styles.button,
  styles.buttonActive
);
