import Animated, { useCode, call } from 'react-native-reanimated'

export const useDebug = (values: { [key: string]: Animated.Adaptable<any> }) => {
    const keys = Object.keys(values)
    const nodes = Object.values(values)

    useCode(
        () =>
            call(nodes, (arrayOfNodes) => {
                keys.map((key, i) => console.log(key + " " + arrayOfNodes[i]))
            }),
        [keys],
    )
}