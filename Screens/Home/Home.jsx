import { useState } from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TouchableWithoutFeedback, Pressable, Alert } from "react-native";

import User from "../../assets/images/svg/user.svg";
import UserWhite from "../../assets/images/svg/userWhite.svg";
import Grid from "../../assets/images/svg/grid.svg";
import Add from "../../assets/images/svg/add.svg";
import AddGrey from "../../assets/images/svg/addGrey.svg";
import LogOut from "../../assets/images/svg/logOut.svg";
import Back from "../../assets/images/svg/arrowLeft.svg";

import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/auth/authOperations";

import { CreatePostsScreen } from "../createPostsScreen/CreatePostsScreen";
import { PostsScreen } from "../postsScreen/PostsScreen";
import { ProfileScreen } from "../profileScreen/ProfileScreen";

const Tabs = createBottomTabNavigator();

export const Home = ({ navigation }) => {
  const [tabsOrder, setTabsOrder] = useState(1);
  const dispatch = useDispatch();

  const confirmLogout = () =>
    Alert.alert("Вы уверены, что хотите выйти?", "", [
      {
        text: "Отменить",
        style: "cancel",
      },
      {
        text: "Выйти",
        onPress: () => {
          dispatch(logoutUser());
          navigation.navigate("Login");
        },
      },
    ]);

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
                    navigation.navigate("Profile");
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
                    navigation.navigate("Posts");
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
            component={PostsScreen}
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
                <Pressable style={{ paddingRight: 20 }} onPress={confirmLogout}>
                  <LogOut />
                </Pressable>
              ),
            }}
          />
          <Tabs.Screen
            name="CreatePost"
            children={() => (
              <CreatePostsScreen adjustTabsOrder={setTabsOrder} />
            )}
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
                  onPress={() => navigation.navigate("Posts")}
                >
                  <Back />
                </Pressable>
              ),
            }}
          />
          <Tabs.Screen
            name="Profile"
            component={ProfileScreen}
            options={{ headerShown: false }}
          />
        </>
      )}
      {tabsOrder === 2 && (
        <>
          <Tabs.Screen
            name="Posts"
            component={PostsScreen}
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
                <Pressable style={{ paddingRight: 20 }} onPress={confirmLogout}>
                  <LogOut />
                </Pressable>
              ),
            }}
          />
          <Tabs.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              tabBarItemStyle: {
                backgroundColor: "#FF6C00",
                height: 40,
                maxWidth: 70,
                alignSelf: "center",
                borderRadius: 20,
              },
              headerShown: false,
            }}
          />
          <Tabs.Screen
            name="CreatePost"
            children={() => (
              <CreatePostsScreen adjustTabsOrder={setTabsOrder} />
            )}
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
                    navigation.navigate("Profile")
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
