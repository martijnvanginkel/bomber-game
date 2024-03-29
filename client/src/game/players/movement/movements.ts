import { ArrowKey } from '../../managers/InputController'
import { Direction, LocationType } from '../../utils/types'

export type Move = LocationType

export const basicUp: Move = {
    x: 0,
    y: -1,
}

export const basicDown: Move = {
    x: 0,
    y: 1,
}

export const basicLeft: Move = {
    x: -1,
    y: 0,
}

export const basicRight: Move = {
    x: 1,
    y: 0,
}

export const directionToCoordinates = {
    [Direction.NORTH]: basicUp,
    [Direction.SOUTH]: basicDown,
    [Direction.WEST]: basicLeft,
    [Direction.EAST]: basicRight,
}

export const arrowKeyToCoordinates = {
    [ArrowKey.UP]: basicUp,
    [ArrowKey.DOWN]: basicDown,
    [ArrowKey.LEFT]: basicLeft,
    [ArrowKey.RIGHT]: basicRight,
}

export const multiplyCoordinates = (coords: LocationType, multiplier: number) => {
    return {
        x: coords.x * multiplier,
        y: coords.y * multiplier,
    }
}
