import Svg, { Line, Circle } from "react-native-svg";
import React, { useEffect, useState } from "react";
import {
  Button,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import cordinateDistanceCalculator from "./cordinateDistanceCalculator";
import getDirectionAndAngle from "./getDirectionAndAngle";
import mapAngle from "./convertor";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;
export default function App() {
  const [startPoint] = useState({
    latitude: 11.58222,
    longitude: 37.3860308,
  });
  const [endPoint, setEndPoint] = useState({
    latitude: 50,
    longitude: -50,
  });

  const [Latitude, setLatitude] = useState(null);
  const [Longitude, setLongitude] = useState(null);
  const [visiblity, setVisiblity] = useState(false);

  const updateEndPoint = () => {
    if (Latitude != null && Longitude != null) {
      setEndPoint({
        latitude: parseFloat(Latitude),
        longitude: parseFloat(Longitude),
      });
    }
    setVisiblity(false);
  };

  let latDiff = Math.abs(startPoint.latitude - endPoint.latitude);
  let lonDiff = Math.abs(startPoint.longitude - endPoint.longitude);

  const verticalInitial = {
    latitude: startPoint.latitude - latDiff,
    longitude: startPoint.longitude,
  };
  const verticalEnd = {
    latitude: startPoint.latitude + latDiff,
    longitude: startPoint.longitude,
  };

  const horizontalInitial = {
    latitude: startPoint.latitude,
    longitude: endPoint.longitude - lonDiff,
  };
  const horizontalEnd = {
    latitude: startPoint.latitude,
    longitude: startPoint.longitude + lonDiff,
  };

  const [distance, setDistance] = useState(0);
  const [angle, setAngle] = useState(null);
  const [direction, setDirection] = useState(null);

  useEffect(() => {
    // Calculate distance when start or end points change
    const newDistance = cordinateDistanceCalculator(
      mapAngle(startPoint.latitude),
      mapAngle(startPoint.longitude),
      mapAngle(endPoint.latitude),
      mapAngle(endPoint.longitude)
    );
    setDistance(newDistance);
    const { direction, angle } = getDirectionAndAngle(startPoint, endPoint);
    setAngle(angle);
    setDirection(direction);
  }, [startPoint, endPoint]);

  return (
    <View style={styles.container}>
      <Svg height="100%" width="100%">
        {/* Draw latitude line */}
        <Line
          x1="0"
          y1="50%"
          x2="100%"
          y2="50%"
          stroke="#333"
          strokeWidth="0.7"
        />
        {/* Draw longitude line/ Vertical */}
        <Line
          x1="50%"
          y1="0"
          x2="50%"
          y2="100%"
          stroke="#333"
          strokeWidth="0.7"
        />

        {/* Actual coordinates */}
        <Line
          x1={`${mapAngle(startPoint.latitude)}%`}
          y1={`${mapAngle(startPoint.longitude)}%`}
          x2={`${mapAngle(endPoint.latitude)}%`}
          y2={`${mapAngle(endPoint.longitude)}%`}
          stroke="gray"
          strokeWidth="2.5"
        />

        {/* Destionation point */}
        <Circle
          onPress={() => {
            setVisiblity(true);
          }}
          cx={`${mapAngle(endPoint.latitude)}%`}
          cy={`${mapAngle(endPoint.longitude)}%`}
          r="10"
          fill="red"
        />

        {/* Relative horizontal */}
        <Line
          x1={`${mapAngle(horizontalInitial.latitude)}%`}
          y1={`${mapAngle(horizontalInitial.longitude)}%`}
          x2={`${mapAngle(horizontalEnd.latitude)}%`}
          y2={`${mapAngle(horizontalEnd.longitude)}%`}
          stroke="#555"
          strokeWidth="1"
        />

        {/* Relative horizontal */}
        <Line
          x1={`${mapAngle(verticalInitial.latitude)}%`}
          y1={`${mapAngle(verticalInitial.longitude)}%`}
          x2={`${mapAngle(verticalEnd.latitude)}%`}
          y2={`${mapAngle(verticalEnd.longitude)}%`}
          stroke="#555"
          strokeWidth="1"
        />
      </Svg>
      <View style={styles.absoluteV}>
        <Text style={styles.absText}>
          Distance: {distance} km at an angle of {angle}&deg; to {direction}{" "}
          direction
        </Text>
        <Text style={styles.absText}>
          Your Lat {startPoint.latitude}, Lon {startPoint.longitude}
        </Text>
        <Text onPress={() => setVisiblity(true)} style={styles.absTextChanger}>
          Dest Lat {endPoint.latitude}, Lon {endPoint.longitude} (Click to
          change)
        </Text>
      </View>
      <View style={[styles.inputsContainer, !visiblity && { display: "none" }]}>
        <Text style={styles.inputText}>Type destination point </Text>
        <TextInput
          onChangeText={(text) => {
            setLatitude(text);
          }}
          value={Latitude ? Latitude?.toString() : ""}
          placeholder="Enter Latitude"
          keyboardType="numeric"
          style={styles.inputButton}
        />
        <TextInput
          onChangeText={(text) => {
            setLongitude(text);
          }}
          value={Longitude ? Longitude?.toString() : ""}
          placeholder="Enter Longitude"
          keyboardType="numeric"
          style={styles.inputButton}
        />
        <Button title="Change" onPress={() => updateEndPoint()} />
        <Button title="Cancel" onPress={() => setVisiblity(false)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "#000",
    width: screenWidth,
    height: screenHeight,
    overflow: "scroll",
    flex: 1,
  },
  absoluteV: {
    position: "absolute",
    backgroundColor: "#ffffff55",
    bottom: 10,
    left: 10,
    borderRadius: 4,
    gap: 10,
    paddingVertical: 10,
  },
  absText: {
    color: "white",
    fontSize: 12,
    paddingHorizontal: 10,
  },
  absTextChanger: {
    color: "white",
    fontSize: 12,
    backgroundColor: "#888",
    padding: 10,
  },
  inputsContainer: {
    position: "absolute",
    top: "50%",
    left: "0%",
    width: screenWidth,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 20,
    gap: 10,
  },
  inputText: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
  },
  inputButton: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 7,
    borderRadius: 10,
  },
});
