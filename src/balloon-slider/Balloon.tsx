import React from "react"
import { View } from "react-native"
import { ReText } from "react-native-redash"
import type Animated from "react-native-reanimated"

interface BalloonProps {
  text: Animated.Node<string>
}
const Balloon = ({ text }: BalloonProps) => {
  return (
    <View
      style={{
        height: 60,
        width: 60,
      }}>
      <View
        style={{
          backgroundColor: "#5d36bb",
          height: "100%",
          width: "100%",
          borderRadius: 50,
          justifyContent: "center",
          alignItems: "center",
        }}>
        <ReText
          text={text}
          style={{
            position: "absolute",
            color: "#fff",
            fontWeight: "bold",
            fontSize: 18,
            textAlign: "center",
          }}
        />
      </View>
      <View
        style={{
          position: "absolute",
          backgroundColor: "#5d36bb",
          height: "20%",
          width: "58.5%",
          transform: [{ rotate: "46.5deg" }],
          left: "7%",
          bottom: "-4%",
          borderRadius: 9,
        }}
      />
      <View
        style={{
          position: "absolute",
          backgroundColor: "#5d36bb",
          height: "20%",
          width: "58.5%",
          transform: [{ rotate: "-46.5deg" }],
          right: "7%",
          bottom: "-4%",
          borderRadius: 9,
        }}
      />
      <View
        style={{
          position: "absolute",
          height: "8%",
          width: "18%",
          borderRadius: 10,
          bottom: "-32%",
          alignSelf: "center",
          backgroundColor: "#5d36bb",
        }}
      />
      <View
        style={{
          position: "absolute",
          backgroundColor: "#5d36bb",
          height: "8%",
          width: "14.5%",
          transform: [{ rotate: "-48deg" }],
          right: "46%",
          bottom: "-29.5%",
          borderRadius: 10,
        }}
      />
      <View
        style={{
          position: "absolute",
          backgroundColor: "#5d36bb",
          height: "8%",
          width: "14.5%",
          transform: [{ rotate: "48deg" }],
          right: "40%",
          bottom: "-29.5%",
          borderRadius: 10,
        }}
      />
    </View>
  )
}

export default Balloon
