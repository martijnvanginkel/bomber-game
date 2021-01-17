import { LocationType } from './utils/types'

export enum Direction {
    UP,
    DOWN,
    LEFT,
    RIGHT,
}

export const moves = {
    basic: {
        [Direction.UP]: { x: 0, y: -1 } as LocationType,
        [Direction.DOWN]: { x: 0, y: 1 } as LocationType,
        [Direction.LEFT]: { x: -1, y: 0 } as LocationType,
        [Direction.RIGHT]: { x: 1, y: 0 } as LocationType,
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
