import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import Chevron from "./Chevron"
import NextBtn from "./NextBtn"
import BalloonSlider from "../../src/balloon-slider/BalloonSlider"

export default function App() {
  return (
    <SafeAreaView
      style={{ flex: 1, paddingHorizontal: 24, backgroundColor: "#fff" }}>
      <View style={styles.space10} />
      <Chevron />
      <Text style={styles.header}>Choose balloon quantity</Text>
      <View style={styles.space80} />
      <View style={styles.slider}>
        <BalloonSlider min={0} max={100} />
      </View>
      <SafeAreaView style={styles.btn}>
        <NextBtn />
      </SafeAreaView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  slider: {
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    position: "absolute",
    bottom: 30,
    right: 20,
  },
  header: {
    marginTop: 50,
    fontSize: 50,
    letterSpacing: 0.6,
    fontWeight: "bold",
    maxWidth: 200,
  },
  space10: {
    marginVertical: 10,
  },
  space80: {
    marginVertical: 80,
  },
})
