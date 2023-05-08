import { useState, useEffect } from "react";

import { posts } from "../../mock_db/posts";

import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { useNavigation } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";

import {
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
import CameraIcon from "../../assets/images/svg/camera.svg";
import CameraWhite from "../../assets/images/svg/cameraWhite.svg";

import {
  styles,
  locationInputStyle,
  titleInputStyle,
  buttonActiveStyle,
  buttonActiveTextStyle,
  buttonInactiveStyle,
  buttonInactiveTextStyle,
  addImageButtonOnImageStyle,
} from "./CreatePostsScreenStyles";

export const CreatePostsScreen = ({ owner, adjustTabsOrder }) => {
  const [image, setImage] = useState(null);
  const [imageTitle, setImageTitle] = useState("");
  const [location, setLocation] = useState("");

  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    if (!isFocused) {
      setImage(null);
    }
  }, [isFocused]);

  const allTheDataInserted = image && location && imageTitle;

  const onSave = () => {
    if (!allTheDataInserted) {
      return Alert.alert("Необходимо заполнить все поля!");
    }
    const newPicture = {
      id: Date.now(),
      owner,
      image,
      title: imageTitle,
      location,
      comments: [],
      likes: 0,
    };
    adjustTabsOrder(1);
    navigation.navigate("Posts", {
      picture: { image, imageTitle, location, commentsCount: 0, comments: [] },
    });
    posts.unshift(newPicture);
    onDelete();
  };

  const onDelete = () => {
    setImage(null);
    setLocation("");
    setImageTitle("");
  };

  const takePicture = async () => {
    if (hasPermission === false) {
      return Alert.alert("Пожалуйста разрешите камере доступ к приложению");
    }
    if (cameraRef) {
      const data = await cameraRef.takePictureAsync(null);
      setImage(data.uri);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View>
          <View style={styles.imageWrap}>
            <TouchableOpacity
              activeOpacity={0.5}
              style={image ? addImageButtonOnImageStyle : styles.addImageButton}
              onPress={takePicture}
            >
              {image ? <CameraWhite /> : <CameraIcon />}
            </TouchableOpacity>
            {!image && isFocused ? (
              <Camera
                style={styles.image}
                type={type}
                ref={(ref) => {
                  setCameraRef(ref);
                }}
              />
            ) : (
              <Image style={styles.image} source={{ uri: image }} />
            )}
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
