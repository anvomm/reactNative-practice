import { useEffect, useState } from "react";

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
  Alert,
  ActivityIndicator,
} from "react-native";

import { useIsFocused } from "@react-navigation/native";

import { auth } from "../../firebase/config";
import { onAuthStateChanged } from "firebase/auth";

import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/auth/authOperations";

import { loginStyles } from "./LoginScreenStyle";
import {
  styles,
  inputStyle,
  onFocusInputStyle,
  onFocusPasswordInputStyle,
} from "../registrationScreen/RegistrationScreenStyle";

export const LoginScreen = ({ navigation }) => {
  const [isCheckingAuth, setIsCheckingAuth] = useState(false);
  const [email, setEmail] = useState("");
  const [focusEmail, setFocusEmail] = useState(false);
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [focusPassword, setFocusPassword] = useState(false);

  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error);
  const isLoading = useSelector((state) => state.auth.isLoading);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setIsCheckingAuth(true);
      if (user) {
        navigation.navigate("Home", {
          screen: "Posts",
        });
      } else {
        setIsCheckingAuth(false);
      }
    });
  }, [isFocused]);

  useEffect(() => {
    if (error && error.includes("wrong-password")) {
      Alert.alert("Проверьте правильность введённой почты и пароля");
    }
    if (!error && !isLoading && email && password) {
      setEmail("");
      setPassword("");
      navigation.navigate("Home", {
        screen: "Posts",
      });
    }
  }, [error, isLoading]);

  const onLogin = () => {
    if (!email || !password) {
      return Alert.alert("Необходимо заполнить все поля!");
    }

    const userData = {
      email,
      password,
    };
    dispatch(loginUser(userData));
  };

  const managePasswordVisibility = () => {
    setHidePassword(!hidePassword);
  };

  return isCheckingAuth || isLoading ? (
    <View style={styles.spinnerContainer}>
      <ActivityIndicator size="large" color="#FF6C00" />
    </View>
  ) : (
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
                value={password}
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
