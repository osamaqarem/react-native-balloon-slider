import React from "react"
import { View, StyleSheet } from "react-native"
import { ReText } from "react-native-redash"
import type Animated from "react-native-reanimated"

interface BalloonProps {
  text: Animated.Node<string>
  tintColor: string
}
const Balloon = ({ text, tintColor }: BalloonProps): JSX.Element => {
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.textContainer,
          {
            backgroundColor: tintColor,
          },
        ]}>
        <ReText text={text} style={styles.text} />
      </View>
      <View
        style={[
          styles.balloonLeft,
          {
            backgroundColor: tintColor,
          },
        ]}
      />
      <View
        style={[
          styles.balloonRight,
          {
            backgroundColor: tintColor,
          },
        ]}
      />
      <View
        style={[
          styles.knotCenter,
          {
            backgroundColor: tintColor,
          },
        ]}
      />
      <View
        style={[
          styles.knotRight,
          {
            backgroundColor: tintColor,
          },
        ]}
      />
      <View
        style={[
          styles.knotLeft,
          {
            backgroundColor: tintColor,
          },
        ]}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    width: 60,
  },
  textContainer: {
    height: "100%",
    width: "100%",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    position: "absolute",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  balloonLeft: {
    position: "absolute",
    height: "20%",
    width: "58.5%",
    transform: [{ rotate: "46.5deg" }],
    left: "7%",
    bottom: "-4%",
    borderRadius: 9,
  },
  balloonRight: {
    position: "absolute",
    height: "20%",
    width: "58.5%",
    transform: [{ rotate: "-46.5deg" }],
    right: "7%",
    bottom: "-4%",
    borderRadius: 9,
  },
  knotCenter: {
    position: "absolute",
    height: "8%",
    width: "18%",
    borderRadius: 10,
    bottom: "-32%",
    alignSelf: "center",
  },
  knotRight: {
    position: "absolute",
    height: "8%",
    width: "14.5%",
    transform: [{ rotate: "-48deg" }],
    right: "46%",
    bottom: "-29.5%",
    borderRadius: 10,
  },
  knotLeft: {
    position: "absolute",
    height: "8%",
    width: "14.5%",
    transform: [{ rotate: "48deg" }],
    right: "40%",
    bottom: "-29.5%",
    borderRadius: 10,
  },
})

export default Balloon
