import { useState } from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TouchableWithoutFeedback, Button } from "react-native";

import User from "../../assets/images/svg/user.svg";
import UserWhite from "../../assets/images/svg/userWhite.svg";
import Grid from "../../assets/images/svg/grid.svg";
import Add from "../../assets/images/svg/add.svg";
import AddGrey from "../../assets/images/svg/addGrey.svg";
import LogOut from "../../assets/images/svg/logOut.svg";
import Back from "../../assets/images/svg/arrowLeft.svg";

import { ProfileScreen } from "../ProfileScreen/ProfileScreen";
import { CreatePostsScreen } from "../CreatePostsScreen/CreatePostsScreen";
import { PostsScreen } from "../PostsScreen/PostsScreen";
import { Pressable } from "react-native";

import { confirmationAlert } from "../../components/feedback/ConfirmationAlert";

const Tabs = createBottomTabNavigator();

export const Home = ({ navigation, route }) => {
  const [tabsOrder, setTabsOrder] = useState(1);
  const {
    params: { login, email, image },
  } = route.params;

  const [userEmail] = useState(email);
  const [username] = useState(login);
  const [avatar, setAvatar] = useState(image);

  return (
    <Tabs.Navigator
      initialRouteName="Posts"
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 83,
          paddingLeft: 50,
          paddingRight: 50,
          borderTopColor: "#E5E5E5",
          borderBottomWidth: 1,
        },
        tabBarIcon: () => {
          switch (route.name) {
            case "Profile":
              return (
                <TouchableWithoutFeedback
                  onPress={() => {
                    setTabsOrder(2);
                    navigation.navigate("Profile", { login: username, email: userEmail, image: avatar });
                  }}
                >
                  {tabsOrder === 2 ? <UserWhite /> : <User />}
                </TouchableWithoutFeedback>
              );
            case "Posts":
              return (
                <TouchableWithoutFeedback
                  onPress={() => {
                    setTabsOrder(1);
                    navigation.navigate("Posts", { login: username, email: userEmail, image: avatar });
                  }}
                >
                  <Grid />
                </TouchableWithoutFeedback>
              );
            case "CreatePost":
              return tabsOrder === 2 ? <AddGrey /> : <Add />;
            default:
              break;
          }
        },
      })}
    >
      {tabsOrder === 1 && (
        <>
          <Tabs.Screen
            name="Posts"
            children={(props) => <PostsScreen avatar={avatar}{...props} />}
            options={{
              title: "Публикации",
              headerStyle: {
                borderBottomColor: "#E5E5E5",
                borderBottomWidth: 1,
                height: 88,
              },
              headerTintColor: "#212121",
              headerTitleAlign: "center",
              headerTitleStyle: {
                fontWeight: 500,
                fontFamily: "Roboto-Bold",
                fontSize: 17,
              },
              headerRight: () => (
                <Pressable
                  style={{ paddingRight: 20 }}
                  onPress={confirmationAlert}
                >
                  <LogOut />
                </Pressable>
              ),
            }}
          />
          <Tabs.Screen
            name="CreatePost"
            children={() => <CreatePostsScreen owner={userEmail} adjustTabsOrder={setTabsOrder}/>}
            options={{
              tabBarStyle: { display: "none" },
              tabBarItemStyle: {
                backgroundColor: "#FF6C00",
                height: 40,
                maxWidth: 70,
                alignSelf: "center",
                borderRadius: 20,
              },
              title: "Создать публикацию",
              headerStyle: {
                borderBottomColor: "#E5E5E5",
                borderBottomWidth: 1,
                height: 88,
              },
              headerTintColor: "#212121",
              headerTitleAlign: "center",
              headerTitleStyle: {
                fontWeight: 500,
                fontFamily: "Roboto-Bold",
                fontSize: 17,
                width: "100%",
              },
              headerLeft: () => (
                <Pressable
                  style={{ paddingLeft: 20 }}
                  onPress={() =>
                    navigation.navigate("Posts", { login: username, email: userEmail, image: avatar })
                  }
                >
                  <Back />
                </Pressable>
              ),
            }}
          />
          <Tabs.Screen name="Profile" children={(props) => <ProfileScreen changeAvatar={setAvatar} {...props} />} options={{headerShown: false}} />
        </>
      )}
      {tabsOrder === 2 && (
        <>
          <Tabs.Screen name="Posts" children={(props) => <PostsScreen avatar={avatar}{...props} />} options={{
              title: "Публикации",
              headerStyle: {
                borderBottomColor: "#E5E5E5",
                borderBottomWidth: 1,
                height: 88,
              },
              headerTintColor: "#212121",
              headerTitleAlign: "center",
              headerTitleStyle: {
                fontWeight: 500,
                fontFamily: "Roboto-Bold",
                fontSize: 17,
              },
              headerRight: () => (
                <Pressable
                  style={{ paddingRight: 20 }}
                  onPress={confirmationAlert}
                >
                  <LogOut />
                </Pressable>
              ),
            }} />
          <Tabs.Screen
            name="Profile"
            children={(props) => <ProfileScreen changeAvatar={setAvatar} {...props} />}
            options={{
              tabBarItemStyle: {
                backgroundColor: "#FF6C00",
                height: 40,
                maxWidth: 70,
                alignSelf: "center",
                borderRadius: 20,
              },
              headerShown: false
            }}
          />
          <Tabs.Screen
            name="CreatePost"
            children={() => <CreatePostsScreen owner={userEmail} adjustTabsOrder={setTabsOrder}/>}
            options={{
              tabBarStyle: { display: "none" },
              title: "Создать публикацию",
              headerStyle: {
                borderBottomColor: "#E5E5E5",
                borderBottomWidth: 1,
                height: 88,
              },
              headerTintColor: "#212121",
              headerTitleAlign: "center",
              headerTitleStyle: {
                fontWeight: 500,
                fontFamily: "Roboto-Bold",
                fontSize: 17,
              },
              headerLeft: () => (
                <Pressable
                  style={{ paddingLeft: 20 }}
                  onPress={() =>
                    navigation.navigate("Profile", { login: username, email: userEmail, image: avatar })
                  }
                >
                  <Back />
                </Pressable>
              ),
            }}
          />
        </>
      )}
    </Tabs.Navigator>
  );
};
