# react-native-balloon-slider

<p align="center" >
  <img
    width="300px"
    src="https://github.com/osamaq/react-native-balloon-slider/raw/master/assets/demo.gif"
    alt="Demo gif"
  />
</p>

Slider with a floating balloon animation. Works on iOS, Android and the web.

> Based on [cuberto/balloon-picker](https://github.com/Cuberto/balloon-picker)

Try it out. Expo Snack:

https://snack.expo.io/@osamaq/react-native-balloon-slider

## Installation

```
$ yarn add react-native-balloon-slider
```

Dependencies:

```
$ yarn add react-native-reanimated react-native-gesture-handler
```

> RN < 0.60 users need to perform linking.

> For Expo users [[1]](https://docs.expo.io/versions/latest/sdk/reanimated/) [[2]](https://docs.expo.io/versions/latest/sdk/gesture-handler/).

iOS only:

```
$ npx pod-install ios
```

## Usage

```js
import BalloonSlider from "react-native-balloon-slider"

const App = () => {
  const balloonSlider = useRef()

  const getSliderValue = () => {
    if (balloonSlider.current) {
      console.log(balloonSlider.current.getValue())
    }
  }

  return (
    <View style={styles.main}>
      <View style={styles.slider}>
        <BalloonSlider min={0} max={100} ref={balloonSlider} />
      </View>
      <TouchableOpacity style={styles.btn} onPress={getSliderValue}>
        <MyButton />
      </TouchableOpacity>
    </View>
  )
}
```

## Props

```ts
interface BalloonSliderProps {
  tintColor?: string
  min: number
  max: number
}
```

## Methods

### `getValue()`

Imperative method for obtaining the current slider value.

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
