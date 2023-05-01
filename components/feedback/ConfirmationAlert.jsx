import { Alert } from "react-native";

export const confirmationAlert = () =>
    Alert.alert('Are you shure you want to log out?', '', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'log out', onPress: () => console.log('log out')},
    ]);