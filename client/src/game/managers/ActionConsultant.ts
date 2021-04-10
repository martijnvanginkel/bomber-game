import { Move } from 'game/players/actions/movements'
import { findCharacterMove } from './../players/actions/utils/characterUtils'
import { Character } from './../players/Character'
import { mergeLocations } from './../utils/general'
import { LocationType, TileStatus } from './../utils/types' //'game/utils/types'
import { Socket } from 'socket.io-client'
import { Map } from '../map/Map'
import { ArrowKey } from './InputController'

export const findAction = (key: ArrowKey, character: Character, map: Map) => {
    if (character.isMoving) {
        return
    }

    const characterMove: Move = findCharacterMove(key, character.getCharacterType)
    const oldLocation = character.getLocation
    const newLocation = mergeLocations(oldLocation, characterMove)

    const tileStatus: TileStatus = map.getTileStatus(newLocation)

    switch (tileStatus) {
        case TileStatus.NONEXISTENT:
            break
        // case TileStatus.OCCUPIED:
        //     // this.triggerBounce(newLocation,)
        //     break
        case TileStatus.AVAILABLE:
            return move(character, newLocation)
            // this.triggerMove(newLocation, direction)
            break
        default:
            throw new Error('Unknown tile status?')
            break
    }
}

const move = (character: Character, newLocation: LocationType) => {
    return {
        run: (socket: Socket) => {
            character.move(newLocation)
            socket.emit('move', character.getID, newLocation)
        },
    }
}

// export interface ShareLocationType {
//     oldLocation: LocationType
//     newLocation: LocationType
//     ID: string
//     direction: Direction
// }

// const move = (newLocation: LocationType) => {
//     return 'asdf'
// }
