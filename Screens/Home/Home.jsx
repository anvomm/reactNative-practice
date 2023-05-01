import { useState } from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TouchableWithoutFeedback } from "react-native";

import User from "../../assets/images/svg/user.svg";
import UserWhite from "../../assets/images/svg/userWhite.svg";
import Grid from "../../assets/images/svg/grid.svg";
import Add from "../../assets/images/svg/add.svg";
import AddGrey from "../../assets/images/svg/addGrey.svg";

import { ProfileScreen } from "../ProfileScreen/ProfileScreen";
import { CreatePostsScreen } from "../CreatePostsScreen/CreatePostsScreen";
import { PostsScreen } from "../PostsScreen/PostsScreen";

const Tabs = createBottomTabNavigator();

export const Home = () => {
  const [tabsOrder, setTabsOrder] = useState(1);

  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 83,
          paddingLeft: 50,
          paddingRight: 50,
          borderTopColor: "#E5E5E5",
        },
        tabBarIcon: () => {
          switch (route.name) {
            case "Profile":
              return (
                <TouchableWithoutFeedback
                  onPress={() => {
                    setTabsOrder(2);
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
          <Tabs.Screen name="Posts" component={PostsScreen} />
          <Tabs.Screen
            name="CreatePost"
            options={{
              tabBarStyle: { display: "none" },
              tabBarItemStyle: {
                backgroundColor: "#FF6C00",
                height: 40,
                alignSelf: "center",
                borderRadius: 20,
              },
            }}
            component={CreatePostsScreen}
          />
          <Tabs.Screen name="Profile" component={ProfileScreen} />
        </>
      )}
      {tabsOrder === 2 && (
        <>
          <Tabs.Screen name="Posts" component={PostsScreen} />
          <Tabs.Screen
            options={{
              tabBarItemStyle: {
                backgroundColor: "#FF6C00",
                height: 40,
                alignSelf: "center",
                borderRadius: 20,
              },
              tabBarIconStyle: { stroke: "fff" },
            }}
            name="Profile"
            component={ProfileScreen}
          />
          <Tabs.Screen
            options={{
              tabBarStyle: { display: "none" },
            }}
            name="CreatePost"
            component={CreatePostsScreen}
          />
        </>
      )}
    </Tabs.Navigator>
  );
};
