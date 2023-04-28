import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
    fontFamily: "Roboto-Bold",
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
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#1B4371",
    lineHeight: 19,
  },
  visibilityButton: {
    position: "absolute",
    top: 145,
    right: 14,
  },
  onFocusInput: {
    borderColor: "#FF6C00",
  },
});

export const inputStyle = StyleSheet.compose(styles.input, styles.margin);
export const onFocusInputStyle = StyleSheet.compose(
  inputStyle,
  styles.onFocusInput
);
export const onFocusPasswordInputStyle = StyleSheet.compose(
  styles.input,
  styles.onFocusInput
);
