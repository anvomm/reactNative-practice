import { Text } from "react-native";

export const ProfileScreen = ({ navigation, route }) => {
  const {email} = route.params;
  console.log(email)
  return <Text>{email}</Text>;
};
