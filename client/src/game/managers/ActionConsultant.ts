import { Move } from './../players/actions/movements'
import { findCharacterMove } from './../players/actions/utils/characterUtils'
import { Character } from './../players/Character'
import { mergeLocations } from './../utils/general'
import { Direction, LocationType, TileStatus } from './../utils/types'
import { Socket } from 'socket.io-client'
import { Map } from '../map/Map'
import { ArrowKey } from './InputController'
import { findDirectionByKey } from './../players/actions/utils/movementUtils'

export const findAction = (key: ArrowKey, character: Character, map: Map) => {
    if (character.isMoving) {
        return
    }

    const characterMove: Move = findCharacterMove(key, character.getCharacterType)
    const oldLocation = character.getLocation

    // maybe find more efficient way to do these calculations
    const newLocation = mergeLocations(oldLocation, characterMove)
    const tileStatus: TileStatus = map.getTileStatus(newLocation)
    const tile = map.getTileByLocation(newLocation)
    const direction = findDirectionByKey(key)

    switch (tileStatus) {
        case TileStatus.NONEXISTENT:
            return
        case TileStatus.OCCUPIED:
            const victimID = tile?.getOccupant
            if (!victimID) {
                return
            }
            return bounce(victimID, direction)
        case TileStatus.AVAILABLE:
            return move(character, newLocation)
        default:
            throw new Error('Unknown tile status?')
    }
}

const bounce = (victimID: number, direction: Direction) => {
    return {
        run: (socket: Socket, characters: Character[]) => {
            const victim = characters.find((character) => character.getID === victimID)
            if (!victim) {
                return
            }
            victim.receiveBounce(direction)
            socket.emit('bounce', victimID, direction)
        },
    }
}

const move = (character: Character, newLocation: LocationType) => {
    return {
        run: (socket: Socket, _characters: Character[]) => {
            character.move(newLocation)
            socket.emit('move', character.getID, newLocation)
        },
    }
}
