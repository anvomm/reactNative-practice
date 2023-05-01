import { useState } from "react";

import {
  ImageBackground,
  View,
  Text,
  TextInput,
  Pressable,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import { loginStyles } from "./LoginScreenStyle";
import {
  styles,
  inputStyle,
  onFocusInputStyle,
  onFocusPasswordInputStyle,
} from "../registrationScreen/RegistrationScreenStyle";

export const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [focusEmail, setFocusEmail] = useState(false);
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [focusPassword, setFocusPassword] = useState(false);

  const onLogin = () => {
    console.log("userdata: ", {
      email,
      password,
    });

    navigation.navigate("Home", {
      screen: "Posts",
      params: { email },
    });

    setEmail("");
    setPassword("");
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
          <View style={loginStyles.whiteBox}>
            <Text style={styles.titleText}>Войти</Text>
            <KeyboardAvoidingView
              behavior={Platform.OS == "ios" ? "padding" : "height"}
            >
              <TextInput
                value={email}
                style={focusEmail ? onFocusInputStyle : inputStyle}
                cursorColor={"transparent"}
                underlineColorAndroid={"#F6F6F6"}
                keyboardType="email-address"
                autoCompleteType="email"
                onFocus={() => setFocusEmail(true)}
                onBlur={() => setFocusEmail(false)}
                placeholder="Адрес электронной почты"
                placeholderTextColor="#BDBDBD"
                onChangeText={(text) => setEmail(text)}
              />
              <TextInput
                secureTextEntry={hidePassword}
                autoCompleteType="password"
                cursorColor={"transparent"}
                style={focusPassword ? onFocusPasswordInputStyle : styles.input}
                onFocus={() => setFocusPassword(true)}
                onBlur={() => setFocusPassword(false)}
                placeholder="Пароль"
                placeholderTextColor="#BDBDBD"
                onChangeText={(text) => setPassword(text)}
              />
              <TouchableOpacity
                activeOpacity={0.8}
                style={loginStyles.visibilityButton}
                onPress={managePasswordVisibility}
              >
                <Text style={styles.linkText}>
                  {hidePassword ? "Показать" : "Скрыть"}
                </Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
            <Pressable style={styles.button} onPress={onLogin}>
              <Text style={styles.buttonText}>Войти</Text>
            </Pressable>
            <View style={styles.linkTextWrap}>
              <Text style={styles.linkText}>Нет аккаунта?</Text>
              <Text
                style={styles.linkText}
                onPress={() => navigation.navigate("Registration")}
              >
                Зарегистрироваться
              </Text>
            </View>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};
