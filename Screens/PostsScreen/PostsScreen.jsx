import { StyleSheet, View } from "react-native"

export const PostsScreen = ({ navigation, route }) => {
    const {login, email, image} = route.params;
    console.log(login, email, image)
    return <View style={styles.container}></View>
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        width: "100%",
        height: "100%"
    }
})