import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import User from "../../assets/images/svg/user.svg";
import Grid from "../../assets/images/svg/grid.svg";
import New from "../../assets/images/svg/new.svg";

import { ProfileScreen } from "../ProfileScreen/ProfileScreen";
import { CreatePostsScreen } from "../CreatePostsScreen/CreatePostsScreen";
import { PostsScreen } from "../PostsScreen/PostsScreen";

const Tabs = createBottomTabNavigator();

export const Home = () => {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#212121",
        /* tabBarItemStyle: route.name === "CreatePost" ? {width: 70, height: 40, backgroundColor: "#FF6C00", borderRadius: 20} : null, */
        tabBarStyle: { paddingLeft: 50, paddingRight: 50 },
        tabBarIcon: ({ focused, color, size }) => {
          switch (route.name) {
            case "Profile":
              return <User stroke={color} />;
            case "Posts":
              return <Grid />;
            case "CreatePost":
              return <New />;
            default:
              break;
          }
        },
      })}
    >
      <Tabs.Screen name="Posts" component={PostsScreen} />
      <Tabs.Screen name="CreatePost" component={CreatePostsScreen} />
      <Tabs.Screen name="Profile" component={ProfileScreen} />
    </Tabs.Navigator>
  );
};
