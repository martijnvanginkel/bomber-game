import { multiplyCoordinates } from './../players/actions/movements'
import { findCharacterMove } from './../players/actions/utils/characterUtils'
import { Character } from './../players/Character'
import { mergeLocations } from './../utils/general'
import { Direction, LocationType, TileStatus } from './../utils/types'
import { Socket } from 'socket.io-client'
import { Map } from '../map/Map'
import { ArrowKey, AbilityKey } from './InputController'
import { findDirectionByKey } from './../players/actions/utils/movementUtils'

interface Action {
    run: (...args: any) => void
}

export const findMove = (key: ArrowKey, character: Character, map: Map) => {
    if (character.isMoving) {
        return
    }

    const characterMove = findCharacterMove(key, character.getCharacterType)
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

export const findAbility = (abilityKey: AbilityKey, arrowKey: ArrowKey, character: Character, map: Map) => {
    if (character.isMoving) {
        return
    }

    console.log('find ability')

    const firstMove = findCharacterMove(arrowKey, character.getCharacterType)
    const firstLocation = mergeLocations(character.getLocation, firstMove)
    const firstTileStatus: TileStatus = map.getTileStatus(firstLocation)

    if (firstTileStatus === TileStatus.NONEXISTENT) {
        return
    }
    if (firstTileStatus === TileStatus.OCCUPIED) {
        const victimID = map.getTileByLocation(firstLocation)?.getOccupant
        if (!victimID) {
            return
        }
        const direction = findDirectionByKey(arrowKey)
        return bounce(victimID, direction)
    }
    const secondMove = multiplyCoordinates(firstMove, 2)
    const secondLocation = mergeLocations(character.getLocation, secondMove)
    const secondTileStatus: TileStatus = map.getTileStatus(secondLocation)

    if (secondTileStatus === TileStatus.NONEXISTENT) {
        return
    }
    if (secondTileStatus === TileStatus.OCCUPIED) {
        const victimID = map.getTileByLocation(secondLocation)?.getOccupant
        if (!victimID) {
            return
        }
        const direction = findDirectionByKey(arrowKey)
        return distanceBounce(character, firstLocation, victimID, direction)
    }

    return move(character, secondLocation)
    
}

const bounce = (victimID: number, direction: Direction): Action => {
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

const move = (character: Character, newLocation: LocationType): Action => {
    return {
        run: (socket: Socket, _characters: Character[]) => {
            character.move(newLocation)
            socket.emit('move', character.getID, newLocation)
        },
    }
}

const distanceBounce = (character: Character, newLocation: LocationType, victimID: number, direction: Direction): Action => {
    return {
        run: async (socket: Socket, characters: Character[]) => {
            socket.emit('move', character.getID, newLocation)
            await character.move(newLocation)
            const victim = characters.find((character) => character.getID === victimID)
            if (!victim) {
                return
            }
            victim.receiveBounce(direction)
            socket.emit('bounce', victimID, direction)
        }
    }
}
