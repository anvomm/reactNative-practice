import {
  StyleSheet,
  ImageBackground,
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  TouchableOpacity,
} from "react-native";

export const RegistrationScreen = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/background.jpg")}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.whiteBox}>
          <Image
            style={styles.avatarImage}
            source={
              /* uri ? { uri } :  */ require("../../assets/emptyAvatar.jpg")
            }
          />
          <TouchableOpacity /*style={styles.addButton}  onPress={onPress} */>
            <Image
              style={styles.addButtonIcon}
              source={require("../../assets/add.png")}
            />
          </TouchableOpacity>
          <Text style={styles.titleText}>Регистрация</Text>
          <TextInput
            style={inputStyle}
            placeholder="Логин"
            placeholderTextColor="#BDBDBD"
          />
          <TextInput
            style={inputStyle}
            placeholder="Адрес электронной почты"
            placeholderTextColor="#BDBDBD"
          />
          <TextInput
            style={styles.input}
            placeholder="Пароль"
            placeholderTextColor="#BDBDBD"
          />
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Зарегистрироваться </Text>
          </Pressable>
          <Text style={styles.linkText}>Уже есть аккаунт? Войти</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  whiteBox: {
    backgroundColor: "#fff",
    height: 549,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    alignItems: "center",
    paddingTop: 92,
  },
  titleText: {
    fontWeight: 500,
    fontSize: 30,
    marginBottom: 33,
    lineHeight: 35,
  },
  button: {
    backgroundColor: "#FF6C00",
    width: 343,
    padding: 16,
    borderRadius: 100,
    marginTop: 43,
    marginBottom: 16,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    lineHeight: 19,
  },
  avatarImage: {
    width: 120,
    height: 120,
    borderRadius: 16,
    position: "absolute",
    top: -60,
  },
  addButtonIcon: {
    width: 25,
    position: "absolute",
    top: -74,
    left: 47,
    backgroundColor: "#fff",
    borderRadius: 50,
  },
  input: {
    width: 343,
    height: 50,
    backgroundColor: "#F6F6F6",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    lineHeight: 19,
  },
  margin: {
    marginBottom: 16,
  },
  linkText: {
    fontSize: 16,
    color: "#1B4371",
    lineHeight: 19,
  }
});

const inputStyle = StyleSheet.compose(styles.input, styles.margin);
