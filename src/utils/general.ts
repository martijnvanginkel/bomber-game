import { LocationType } from './types'

export function waitForTime(time: number) {
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve()
        }, time)
    })
}

export function mergeLocations(...locations: LocationType[]) {
    return locations.reduce(
        (accumulator: LocationType, current: LocationType) => {
            return {
                x: accumulator.x + current.x,
                y: accumulator.y + current.y,
            }
        },
    )
}
