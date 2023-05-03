import { Alert } from "react-native";

export const confirmationAlert = () =>
    Alert.alert('Вы уверены, что хотите выйти?', '', [
      {
        text: 'Отменить',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'Выйти', onPress: () => console.log('log out')},
    ]);