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
    paddingTop: 92,
    height: 549,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  titleText: {
    fontFamily: "Roboto-Bold",
    fontWeight: 500,
    fontSize: 30,
    marginBottom: 33,
    lineHeight: 35,
  },
  button: {
    width: 343,
    padding: 16,
    marginTop: 43,
    marginBottom: 16,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
  },
  buttonText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#fff",
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
  input: {
    width: 343,
    height: 50,
    padding: 16,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 8,
  },
  margin: {
    marginBottom: 16,
  },
  linkText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
  visibilityButton: {
    position: "absolute",
    top: 145,
    right: 14,
  },
  onFocusInput: {
    borderColor: "#FF6C00",
  },
  linkTextWrap: {
    flexDirection: "row",
    gap: 5,
  },
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
  }
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
