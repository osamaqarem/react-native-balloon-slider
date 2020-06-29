import React from "react"
import { View, StyleSheet } from "react-native"

interface ChevronProps {
  pointsTo?: "left" | "right"
}
const Chevron = ({ pointsTo = "left" }: ChevronProps) => {
  const pointsLeft = pointsTo === "left"

  return (
    <View
      style={[
        styles.container,
        {
          left: pointsLeft ? -8 : 8,
        },
      ]}>
      <View
        style={[
          styles.upperDash,
          {
            transform: [{ rotate: pointsLeft ? "-42deg" : "42deg" }],
          },
        ]}
      />
      <View
        style={{
          alignSelf: "center",
          position: "absolute",
        }}>
        <View
          style={[
            styles.lowerDash,
            {
              transform: [{ rotate: pointsLeft ? "42deg" : "-42deg" }],
            },
          ]}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 30,
    width: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  upperDash: {
    position: "absolute",
    backgroundColor: "black",
    height: StyleSheet.hairlineWidth * 6,
    width: 12,
    borderRadius: 8,
  },
  lowerDash: {
    top: 6.5,
    backgroundColor: "black",
    height: StyleSheet.hairlineWidth * 6,
    width: 12,
    borderRadius: 8,
  },
})

export default Chevron
