import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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

export const locationInputStyle = StyleSheet.compose(
  styles.input,
  styles.padding
);

export const titleInputStyle = StyleSheet.compose(
  styles.input,
  styles.boldText
);

export const buttonInactiveTextStyle = StyleSheet.compose(
  styles.buttonText,
  styles.buttonInactiveText
);

export const buttonActiveTextStyle = StyleSheet.compose(
  styles.buttonText,
  styles.buttonActiveText
);

export const addImageButtonOnImageStyle = StyleSheet.compose(
  styles.addImageButton,
  styles.addImageButtonWithOpacity
);

export const buttonInactiveStyle = StyleSheet.compose(
  styles.button,
  styles.buttonInactive
);

export const buttonActiveStyle = StyleSheet.compose(
  styles.button,
  styles.buttonActive
);
