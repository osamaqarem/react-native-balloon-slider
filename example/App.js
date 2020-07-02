import React, { useRef } from "react"
import { StyleSheet, Text, View } from "react-native"
import Chevron from "./Chevron"
import NextBtn from "./NextBtn"
import BalloonSlider from "./src/BalloonSlider"

export default function App() {
  const balloonSlider = useRef()

  const getSliderValue = () => {
    if (balloonSlider.current) {
      console.log(balloonSlider.current.getValue())
    }
  }

  return (
    <View style={styles.main}>
      <View style={styles.chevron}>
        <Chevron />
      </View>
      <Text style={styles.header}>Choose balloon quantity</Text>
      <View style={styles.slider}>
        <BalloonSlider min={0} max={100} ref={balloonSlider} />
      </View>
      <View style={styles.btn}>
        <NextBtn />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  main: { flex: 1, padding: 44, backgroundColor: "#fff" },
  header: {
    padding: 10,
    marginTop: 50,
    fontSize: 50,
    letterSpacing: 0.6,
    fontWeight: "bold",
    maxWidth: 250,
  },
  chevron: {
    marginVertical: 10,
  },
  slider: {
    width: 300,
    marginTop: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    position: "absolute",
    bottom: 50,
    right: 25,
  },
})
