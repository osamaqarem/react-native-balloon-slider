import React, {
  useMemo,
  useRef,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react"
import { StyleSheet, View, Animated as VanillaAN } from "react-native"
import {
  LongPressGestureHandler,
  PanGestureHandler,
  State,
} from "react-native-gesture-handler"
import Animated, {
  abs,
  concat,
  cond,
  divide,
  Extrapolate,
  floor,
  greaterThan,
  interpolate,
  set,
  sub,
  useCode,
  diff,
  eq,
  call,
  multiply,
} from "react-native-reanimated"
import {
  clamp,
  useGestureHandler,
  useValue,
  withOffset,
} from "react-native-redash"
import Balloon from "./Balloon"
import {
  withBalloonScaleTiming,
  withBalloonTranslateXTiming,
  withOuterThumbScaleTiming,
  withThumbScaleTiming,
} from "./timings"
import type { BalloonSliderFC } from "./types"

const BalloonSlider: BalloonSliderFC = (
  { min = 0, max = 100, tintColor = "#5d36bb" },
  ref
) => {
  // need to use state to get picker width on mount
  // TODO: try
  // Animated.event([]) with useCode
  const [sliderWidth, setSliderWidth] = useState(0)
  const textValue = useRef("")
  const dragState = useValue(State.UNDETERMINED)
  const dragX = useValue(0)
  const velocityX = useValue(0)
  // handler
  const panHandler = useGestureHandler({
    state: dragState,
    translationX: dragX,
    velocityX,
  })
  const panHandlerRef = useRef<any>()

  // dragX with value memorization
  const offset = useValue(0)
  const offsetX = withOffset(dragX, dragState, offset)

  // to prevent drag outside the picker's width
  const halfWidth = cond(
    greaterThan(sliderWidth, 0),
    divide(sliderWidth, 2),
    10 // TODO: what should this be
  )

  // clamp translateX based on total picker width
  const lowerBound = sub(0, halfWidth)
  const upperBound = halfWidth
  const clampedX = clamp(offsetX, lowerBound, halfWidth)

  // map drag value to line width over the full picker width
  const lineWidth = interpolate(clampedX, {
    inputRange: [lowerBound, upperBound],
    outputRange: [0, sliderWidth],
  })

  const pressState = useValue(State.UNDETERMINED)
  const pressHandler = useGestureHandler({ state: pressState })
  const pressHandlerRef = useRef<any>()

  // memo-ed to prevent resetting animation state on rerenders
  const outerThumbScale = useMemo(
    () => withOuterThumbScaleTiming(pressState),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const outerThumbBorderRadius = interpolate(outerThumbScale, {
    inputRange: [1, 1.2],
    outputRange: [14, 18],
    extrapolate: Extrapolate.CLAMP,
  })
  const innerThumbScale = interpolate(outerThumbScale, {
    inputRange: [1, 1.2],
    outputRange: [1, 3.1],
    extrapolate: Extrapolate.CLAMP,
  })
  const innerThumbBorderRadius = interpolate(outerThumbScale, {
    inputRange: [1, 1.2],
    outputRange: [2, 5],
    extrapolate: Extrapolate.CLAMP,
  })

  const balloonScale = useMemo(
    () => withBalloonScaleTiming(pressState),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const balloonTextNode = floor(
    interpolate(clampedX, {
      inputRange: [lowerBound, upperBound],
      outputRange: [min, max],
      extrapolate: Extrapolate.CLAMP,
    })
  )

  const balloonTextString = concat(
    // fix for -0 edge case
    cond(eq(balloonTextNode, 0), 0, balloonTextNode),
    ""
  )

  // exposing text value to JS
  useCode(
    () =>
      cond(
        greaterThan(diff(pressState), 0),
        call([balloonTextString], ([text]) => {
          textValue.current = text
        })
      ),
    [balloonTextString, pressState]
  )

  useImperativeHandle(ref, () => ({
    getValue: () => {
      return textValue.current
    },
  }))

  // No idea why this is needed.
  // The animation breaks if we use clampedX directly in the timing function.
  const clampedXCopy = useValue(0)
  useCode(() => set(clampedXCopy, clampedX), [clampedX])

  const balloonX = withBalloonTranslateXTiming(clampedXCopy)

  const xDiff = sub(clampedXCopy, balloonX)
  const moving = cond(greaterThan(abs(xDiff), 0.001), 1, 0)

  const thumbScale = useMemo(
    () => withThumbScaleTiming(dragState, velocityX, moving),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const angle = multiply(
    500,
    cond(
      velocityX,
      interpolate(velocityX, {
        inputRange: [-800, 800],
        outputRange: [16, -16],
        extrapolate: Extrapolate.CLAMP,
      }),
      0
    )
  )

  const angleCopy = useRef(new VanillaAN.Value(0))

  // 😭
  useCode(
    () =>
      call([angle], ([angle]) => {
        angleCopy.current.setValue(angle)
      }),
    [angle]
  )

  const angleActual = angleCopy.current.interpolate({
    inputRange: [-16, 16],
    outputRange: ["-16deg", "16deg"],
    extrapolate: Extrapolate.CLAMP,
  })

  return (
    <Animated.View
      onLayout={(e) => setSliderWidth(e.nativeEvent.layout.width)}
      style={styles.container}
    >
      <View style={styles.progressBar} />
      <Animated.View
        style={[
          styles.progressBarFill,
          {
            width: lineWidth,
            backgroundColor: tintColor,
          },
        ]}
      />
      {/* balloonContainer prevents scale + translateX origin of transform errors */}
      <Animated.View
        pointerEvents="none"
        style={[
          styles.balloonContainer,
          {
            transform: [{ translateX: balloonX }],
          },
        ]}
      >
        <VanillaAN.View
          style={{
            transform: [
              {
                rotateZ: angleActual,
              },
            ],
          }}
        >
          <Animated.View
            style={[
              styles.balloon,
              {
                transform: [
                  {
                    scale: balloonScale,
                    translateY: -80,
                  },
                ],
              },
            ]}
          >
            <Balloon text={balloonTextString} tintColor={tintColor} />
          </Animated.View>
        </VanillaAN.View>
      </Animated.View>
      <LongPressGestureHandler
        minDurationMs={0}
        maxDist={Number.MAX_SAFE_INTEGER}
        shouldCancelWhenOutside={false}
        {...pressHandler}
        ref={pressHandlerRef}
        simultaneousHandlers={panHandlerRef}
      >
        {/* Nesting handlers requires views between */}
        {/* translate slidingView instead of thumbContainer to prevent gesture state bug only on android */}
        <Animated.View
          style={[
            styles.slidingView,
            {
              transform: [{ translateX: clampedX }],
            },
          ]}
        >
          <PanGestureHandler
            {...panHandler}
            ref={panHandlerRef}
            simultaneousHandlers={pressHandlerRef}
            shouldCancelWhenOutside={false}
          >
            {/* thumbContainer prevents scale + translateX origin of transform errors */}
            {/* placed in pangesturehandler to better capture pan */}
            <Animated.View style={styles.thumbContainer}>
              <Animated.View
                style={[
                  styles.thumb,
                  {
                    transform: [{ scale: thumbScale }],
                  },
                ]}
              >
                <Animated.View
                  style={[
                    styles.outerThumb,
                    {
                      borderRadius: outerThumbBorderRadius,
                      transform: [{ scale: outerThumbScale }],
                      backgroundColor: tintColor,
                    },
                  ]}
                >
                  <Animated.View
                    style={[
                      styles.innerThumb,
                      {
                        transform: [{ scale: innerThumbScale }],
                        borderRadius: innerThumbBorderRadius,
                      },
                    ]}
                  />
                </Animated.View>
              </Animated.View>
            </Animated.View>
          </PanGestureHandler>
        </Animated.View>
      </LongPressGestureHandler>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    width: "100%",
  },
  progressBar: {
    height: StyleSheet.hairlineWidth * 4,
    borderRadius: StyleSheet.hairlineWidth,
    backgroundColor: "#E8E8E8",
    ...StyleSheet.absoluteFillObject,
  },
  progressBarFill: {
    height: StyleSheet.hairlineWidth * 4,
    borderRadius: StyleSheet.hairlineWidth,
    ...StyleSheet.absoluteFillObject,
  },
  balloonContainer: {
    position: "absolute",
    zIndex: 1,
  },
  balloon: {
    bottom: 15,
    height: 225,
  },
  slidingView: {
    position: "absolute",
  },
  thumbContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 56,
    height: 56,
  },
  thumb: {
    width: 36,
    height: 36,
  },
  outerThumb: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  innerThumb: {
    alignSelf: "center",
    backgroundColor: "#fff",
    width: 10,
    height: 10,
  },
})

export default forwardRef(BalloonSlider)
