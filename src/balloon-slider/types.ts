import type { Ref } from 'react'

export interface BalloonSliderProps {
    tintColor?: string
    min: number
    max: number
}

export type BalloonSliderStatic = {
    getValue: () => string
} | undefined

export type BalloonSliderFC = (
    props: BalloonSliderProps,
    ref: Ref<BalloonSliderStatic>,
) => JSX.Element