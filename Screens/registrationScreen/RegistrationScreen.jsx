import { useState } from "react";

import * as ImagePicker from "expo-image-picker";

import {
  ImageBackground,
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import { styles, inputStyle, onFocusInputStyle, onFocusPasswordInputStyle } from "./RegistrationScreenStyle";

export const RegistrationScreen = () => {
  const [login, setLogin] = useState("");
  const [focusLogin, setFocusLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [focusEmail, setFocusEmail] = useState(false);
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [focusPassword, setFocusPassword] = useState(false);

  const [image, setImage] = useState(null);

  const onRegister = () => {
    console.log("userdata: ", {
      login,
      email,
      password,
    });
    setLogin("");
    setEmail("");
    setPassword("");
  };

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

  const managePasswordVisibility = () => {
    setHidePassword(!hidePassword);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../../assets/images/background.jpg")}
          resizeMode="cover"
          style={styles.image}
        >
          <View style={styles.whiteBox}>
            <Image
              style={styles.avatarImage}
              source={
                image ? { uri: image } : require("../../assets/images/emptyAvatar.jpg")
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
            <Text style={styles.titleText}>Регистрация</Text>
            <KeyboardAvoidingView
              behavior={Platform.OS == "ios" ? "padding" : "height"}
            >
              <TextInput
                value={login}
                style={focusLogin ? onFocusInputStyle : inputStyle}
                onFocus={() => setFocusLogin(true)}
                onBlur={() => setFocusLogin(false)}
                underlineColorAndroid="#F6F6F6"
                placeholder="Логин"
                placeholderTextColor="#BDBDBD"
                onChangeText={(text) => setLogin(text)}
                clearButtonMode="always"
              />
              <TextInput
                value={email}
                style={focusEmail ? onFocusInputStyle : inputStyle}
                onFocus={() => setFocusEmail(true)}
                onBlur={() => setFocusEmail(false)}
                underlineColorAndroid="#F6F6F6"
                placeholder="Адрес электронной почты"
                placeholderTextColor="#BDBDBD"
                onChangeText={(text) => setEmail(text)}
              />
              <TextInput
                secureTextEntry={hidePassword}
                autoCompleteType="password"
                style={focusPassword ? onFocusPasswordInputStyle : styles.input}
                onFocus={() => setFocusPassword(true)}
                onBlur={() => setFocusPassword(false)}
                placeholder="Пароль"
                placeholderTextColor="#BDBDBD"
                onChangeText={(text) => setPassword(text)}
              />
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.visibilityButton}
                onPress={managePasswordVisibility}
              >
                <Text style={styles.linkText}>
                  {hidePassword ? "Показать" : "Скрыть"}
                </Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
            <Pressable style={styles.button} onPress={onRegister}>
              <Text style={styles.buttonText}>Зарегистрироваться </Text>
            </Pressable>
            <Text style={styles.linkText} /* позже здесь  будет ссылка */>Уже есть аккаунт? Войти</Text>  
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

