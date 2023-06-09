import { useState, useEffect } from "react";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/config";

import { useDispatch } from "react-redux";
import { createPost } from "../../redux/posts/postsOperations";

import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";

import { useNavigation, useIsFocused } from "@react-navigation/native";

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

import LocationIcon from "../../assets/images/svg/location.svg";
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

export const CreatePostsScreen = ({ adjustTabsOrder }) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setOwner(user.uid);
    }
  });

  const [owner, setOwner] = useState("");
  const [image, setImage] = useState(null);
  const [imageTitle, setImageTitle] = useState("");
  const [location, setLocation] = useState("");

  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type] = useState(Camera.Constants.Type.back);

  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      let response = await Location.requestPermissionsAsync();
      if (response.status !== "granted") {
        console.log("Permission to access location was denied");
      }

      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    if (!isFocused) {
      setImage(null);
    }
  }, [isFocused]);

  const allTheDataInserted = image && location && imageTitle;

  const onSave = async () => {
    if (!allTheDataInserted) {
      return Alert.alert("Необходимо заполнить все поля!");
    }
    let pictureLocation = await Location.getCurrentPositionAsync({});
    const coords = {
      lat: pictureLocation.coords.latitude,
      long: pictureLocation.coords.longitude,
    };

    const post = {
      id: Date.now(),
      owner,
      image,
      title: imageTitle,
      location,
      comments: [],
      likes: [],
      coords,
    };
    dispatch(createPost(post));
    adjustTabsOrder(1);
    navigation.navigate("Posts");
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
      const { uri } = await cameraRef.takePictureAsync(null);
      setImage(uri);
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
              <LocationIcon style={styles.icon} />
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
