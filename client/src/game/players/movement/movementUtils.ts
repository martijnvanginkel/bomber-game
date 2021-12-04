import { ArrowKey } from '../../managers/InputController'
import { Direction } from '../../utils/types'

export const findDirectionByKey = (key: ArrowKey) => {
    const directionConversion = {
        [ArrowKey.UP]: Direction.NORTH,
        [ArrowKey.RIGHT]: Direction.EAST,
        [ArrowKey.DOWN]: Direction.SOUTH,
        [ArrowKey.LEFT]: Direction.WEST,
    }
    return directionConversion[key]
}
