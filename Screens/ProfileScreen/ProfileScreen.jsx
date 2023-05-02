import { useState } from "react";

import * as ImagePicker from "expo-image-picker";

import { StyleSheet, View, ImageBackground, Image, TouchableOpacity, Text, Pressable } from "react-native";

import LogOut from "../../assets/images/svg/logOut.svg";

import { confirmationAlert } from "../../components/feedback/ConfirmationAlert";

export const ProfileScreen = (props) => {
  const { login, image } = props.route.params;
  
  const [username] = useState(login ?? "Username");
  const [newIimage, setNewImage] = useState(image ?? null);
  const [pictures] = useState(props.pictures ?? []);
  console.log(pictures);

  const pickImage = async () => {
    if (newIimage) {
      return setImage(null);
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setNewImage(result.assets[0].uri);
    }
  };

  return <View style={styles.container}>
    <ImageBackground
          source={require("../../assets/images/background.jpg")}
          resizeMode="cover"
          style={styles.image}
        >
            <View style={styles.whiteBox}>
            <Pressable
                  style={styles.logOutButton}
                  onPress={confirmationAlert}
                >
                  <LogOut />
                </Pressable>
            <Image
              style={styles.avatarImage}
              source={
                image
                  ? { uri: newIimage }
                  : require("../../assets/images/emptyAvatar.jpg")
              }
            />
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.addButton}
              onPress={pickImage}
            >
              <Image
                style={styles.addButtonIcon}
                source={
                  image
                    ? require("../../assets/images/delete.png")
                    : require("../../assets/images/add.png")
                }
              />
            </TouchableOpacity>
            <Text style={styles.nameText}>{username}</Text>
            </View>
        </ImageBackground>
  </View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  whiteBox: {
    paddingTop: 24,
    paddingHorizontal: 16,
    minHeight: 549,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
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
  }
});
