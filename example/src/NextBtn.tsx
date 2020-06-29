import React from "react"
import { View, Text } from "react-native"
import Chevron from "./Chevron"

const NextBtn = () => (
  <View
    style={{
      width: 160,
      height: 56,
      borderRadius: 12,
      backgroundColor: "#FFBC41",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
    }}>
    <Text
      style={{
        fontWeight: "bold",
        fontSize: 18,
        letterSpacing: 0.4,
      }}>
      Next
    </Text>
    <Chevron pointsTo="right" />
  </View>
)

export default NextBtn
