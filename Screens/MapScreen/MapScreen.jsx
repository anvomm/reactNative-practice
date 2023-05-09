import { View, StyleSheet, Dimensions } from "react-native";

import MapView, { Marker } from "react-native-maps";

export const MapScreen = (props) => {
  const { latitude, longitude } = props.route.params;

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        region={{
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        mapType="terrain"
        minZoomLevel={15}
      >
        <Marker
          title="Фото сделано здесь"
          coordinate={{ latitude, longitude }}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    mapStyle: {
      width: Dimensions.get("window").width,
      height: Dimensions.get("window").height*0.95,
    },
  });
