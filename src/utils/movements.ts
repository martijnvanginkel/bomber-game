import { LocationType, Key } from './types'

export const moves = {
    basic: {
        [Key.UP]: { x: 0, y: -1 } as LocationType,
        [Key.DOWN]: { x: 0, y: 1 } as LocationType,
        [Key.LEFT]: { x: -1, y: 0 } as LocationType,
        [Key.RIGHT]: { x: 1, y: 0 } as LocationType,
    }
}
