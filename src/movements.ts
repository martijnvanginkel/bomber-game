import { LocationType, Arrow } from './utils/types'

export const moves = {
    basic: {
        [Arrow.UP]: { x: 0, y: -1 } as LocationType,
        [Arrow.DOWN]: { x: 0, y: 1 } as LocationType,
        [Arrow.LEFT]: { x: -1, y: 0 } as LocationType,
        [Arrow.RIGHT]: { x: 1, y: 0 } as LocationType,
    }
}


export function mergeLocations(...locations: LocationType[]) {
    return locations.reduce((accumulator: LocationType, current: LocationType) => {
        return {
            x: accumulator.x + current.x,
            y: accumulator.y + current.y,
        }
    })
}
