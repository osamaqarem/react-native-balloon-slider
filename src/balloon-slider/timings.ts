import { State } from "react-native-gesture-handler"
import Animated, {
    abs, and,
    block, Clock, cond,
    Easing, eq,
    greaterThan,
    lessThan, neq,
    or, set,
    spring, startClock, stopClock, timing,
    Value,
    clockRunning,
    add
} from "react-native-reanimated"

export const withBalloonScaleTiming = (pressState: Animated.Value<State>) => {
    const clock = new Clock()
    const state = {
        finished: new Value(0),
        velocity: new Value(0),
        position: new Value(0),
        time: new Value(0),
    }
    const config = {
        damping: new Value(14),
        mass: new Value(1),
        stiffness: 120,
        overshootClamping: false,
        restSpeedThreshold: 0.001,
        restDisplacementThreshold: 0.001,
        toValue: new Value(0),
    }

    const scaleToValue = cond(
        or(eq(pressState, State.ACTIVE), eq(pressState, State.BEGAN)),
        1,
        0,
    )

    return block([
        // continuously running the animation
        spring(clock, state, config),
        // handle new toValue
        cond(neq(config.toValue, scaleToValue), [
            // start the clock and reset the animation state
            set(state.velocity, 0),
            set(state.time, 0),
            set(state.finished, 0),
            cond(
                neq(pressState, State.ACTIVE),
                [set(config.damping, 50), set(config.mass, 0.3)],
                [set(config.damping, 14), set(config.mass, 1)],
            ),
            // start animation
            startClock(clock),
            // make condition false
            set(config.toValue, scaleToValue),
        ]),
        // when finished, stop the animation
        cond(state.finished, stopClock(clock)),
        // return animation value
        state.position,
    ])
}

export const withOuterThumbScaleTiming = (pressState: Animated.Value<State>) => {
    const clock = new Clock()
    const state = {
        finished: new Value(0),
        frameTime: new Value(0),
        position: new Value(0),
        time: new Value(0),
    }
    const config = {
        toValue: new Value(0),
        duration: new Value(100),
        easing: Easing.linear,
    }

    const scaleToValue = block([
        cond(or(eq(pressState, State.ACTIVE), eq(pressState, State.BEGAN)), 1.2, 1),
    ])

    return block([
        // continuously running the animation
        timing(clock, state, config),
        // handle new toValue
        cond(neq(config.toValue, scaleToValue), [
            // start the clock and reset the animation state
            set(state.frameTime, 0),
            set(state.time, 0),
            set(state.finished, 0),
            cond(
                lessThan(scaleToValue, config.toValue),
                set(config.duration, 100),
                set(config.duration, 200),
            ),
            // start animation
            startClock(clock),
            // make condition false
            set(config.toValue, scaleToValue),
        ]),
        // when finished, stop the animation
        cond(state.finished, stopClock(clock)),
        // return animation value
        state.position,
    ])
}

export const withThumbScaleTiming = (
    dragState: Animated.Value<State>,
    velocityX: Animated.Value<number>,
    moving: Animated.Adaptable<number>,
) => {
    const clock = new Clock()
    const state = {
        finished: new Value(0),
        frameTime: new Value(0),
        position: new Value(0),
        time: new Value(0),
    }
    const config = {
        toValue: new Value(1),
        duration: new Value(0),
        easing: Easing.linear,
    }

    const scaleToValue = block([
        cond(
            and(eq(dragState, State.ACTIVE), greaterThan(abs(velocityX), 150)),
            cond(moving, 0.8, 1),
            1,
        ),
    ])

    return block([
        // continuously running the animation
        timing(clock, state, config),
        // handle new toValue
        cond(neq(config.toValue, scaleToValue), [
            // start the clock and reset the animation state
            set(state.frameTime, 0),
            set(state.time, 0),
            set(state.finished, 0),
            cond(
                lessThan(scaleToValue, config.toValue),
                set(config.duration, 400),
                set(config.duration, 300),
            ),
            set(config.toValue, scaleToValue),
            // start animation
            startClock(clock),
        ]),
        // when finished, stop the animation
        cond(state.finished, stopClock(clock)),
        // return animation value
        state.position,
    ])
}


export const withBalloonTranslateXTiming = (clampedXCopy: Animated.Value<number>) => {
    const clock = new Clock()
    const delayClock = new Clock()
    const delayed = new Value(0)
    const delayMs = 100

    const state = {
        finished: new Value(0),
        frameTime: new Value(0),
        position: new Value(0),
        time: new Value(0),
    }

    const config = {
        toValue: new Value(0),
        duration: 100,
        easing: Easing.linear,
    }

    return block([
        cond(clockRunning(delayClock), 0, startClock(delayClock)),
        cond(eq(delayed, 0), set(delayed, add(delayClock, delayMs))),
        timing(clock, state, config),
        // handle new toValue
        cond(
            and(greaterThan(delayClock, delayed), neq(config.toValue, clampedXCopy)),
            [
                // start the clock and reset the animation state
                set(state.frameTime, 0),
                set(state.time, 0),
                set(state.finished, 0),
                set(config.toValue, clampedXCopy),
                set(delayed, 0),
                // start animation
                startClock(clock),
            ],
        ),
        // when finished, stop the animation
        cond(state.finished, stopClock(clock)),
        // return animation value
        state.position,
    ])
}
