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
