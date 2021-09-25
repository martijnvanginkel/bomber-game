import { Socket } from 'socket.io-client'
import { Map } from 'game/map/Map'
import { Character } from 'game/players/Character'
import { AbilityKey, ArrowKey } from './InputController'
import { arrowKeyToCoordinates } from '../players/movement/movements'
import { mergeLocations } from '../utils/general'
import { Direction, LocationType, TileStatus } from '../utils/types'
import { findDirectionByKey } from '../players/movement/movementUtils'

export enum ActionType {
    move,
    ability,
}

interface MoveAction {
    type: ActionType.move
    arrowKey: ArrowKey
}

interface AbilityAction {
    type: ActionType.ability
    abilityKey: AbilityKey
    arrowKey?: ArrowKey
}

export type ActionData = MoveAction | AbilityAction

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

    private fireMove(key: ArrowKey) {
        if (this.player.isMoving) {
            return
        }

        // player, map, socket, characters

        const locationIncrement = arrowKeyToCoordinates[key]
        const newLocation = mergeLocations(this.player.getLocation, locationIncrement)
        const tileStatus: TileStatus = this.map.getTileStatus(newLocation)

        if (tileStatus === TileStatus.AVAILABLE) {
            this.emitMove(newLocation)
            return
        }
        if (tileStatus === TileStatus.OCCUPIED) {
            const tile = this.map.getTileByLocation(newLocation)
            const victimID = tile?.getOccupant
            if (!victimID) {
                return
            }
            const direction = findDirectionByKey(key)
            this.emitBounce(victimID, direction)
        }
    }

    private emitBounce(victimID: number, direction: Direction) {
        const victim = this.characters.find((character) => character.getID === victimID)
        if (!victim) {
            return
        }
        victim.receiveBounce(direction)
        this.socket.emit('bounce', victimID, direction)
    }

    private emitMove(newLocation: LocationType) {
        this.player.move(newLocation)
        this.socket.emit('move', this.player.getID, newLocation)
    }
}
