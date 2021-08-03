import { Socket } from 'socket.io-client'
import { Map } from 'game/map/Map'
import { Character } from 'game/players/Character'
import { AbilityKey, ArrowKey } from './InputController'
import { arrowKeyToCoordinates } from '../players/actions/movements'
import { mergeLocations } from '../utils/general'
import { Direction, LocationType, TileStatus } from '../utils/types'
import { findDirectionByKey } from '../players/actions/utils/movementUtils'

export enum ActionType {
    move,
    ability,
}

export interface ActionData {
    type: ActionType
    arrowKey?: ArrowKey
    abilityKey?: AbilityKey
}

export class ActionEmitter {
    public constructor(
        private socket: Socket,
        private map: Map,
        private characters: Character[],
        private player: Character,
    ) {}

    public send(data: ActionData) {
        if (data.type === ActionType.move) {
            this.fireMove(data.arrowKey)
        }
        if (data.type === ActionType.ability) {
        }
    }

    private fireMove(key: ArrowKey | undefined) {
        if (this.player.isMoving) {
            return
        }
        if (!key) {
            return
        }
        const characterMove = arrowKeyToCoordinates[key] //findCharacterMove(key, character.getCharacterType)
        const oldLocation = this.player.getLocation

        // // maybe find more efficient way to do these calculations
        const newLocation = mergeLocations(oldLocation, characterMove)
        const tileStatus: TileStatus = this.map.getTileStatus(newLocation)
        const tile = this.map.getTileByLocation(newLocation)
        const direction = findDirectionByKey(key)

        if (tileStatus === TileStatus.NONEXISTENT) {
            return
        }
        if (tileStatus === TileStatus.AVAILABLE) {
            this.move(this.player, newLocation)
            return
        }
        if (tileStatus === TileStatus.OCCUPIED) {
            const victimID = tile?.getOccupant
            if (!victimID) {
                return
            }
            this.bounce(victimID, direction)
            return
        }
        throw new Error('Unknown tile status')
    }

    private bounce = (victimID: number, direction: Direction) => {
        // return {
        //     run: (socket: Socket, characters: Character[]) => {
        const victim = this.characters.find((character) => character.getID === victimID)
        if (!victim) {
            return
        }
        victim.receiveBounce(direction)
        this.socket.emit('bounce', victimID, direction)
        //     },
        // }
    }

    private move = (character: Character, newLocation: LocationType) => {
        // return {
        //     run: (socket: Socket, _characters: Character[]) => {
        character.move(newLocation)
        this.socket.emit('move', character.getID, newLocation)
        //     },
        // }
    }
}
