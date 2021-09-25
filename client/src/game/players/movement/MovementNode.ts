import { GameComInfo } from '../..//Game'
import { ArrowKey } from '../../managers/InputController'
import { mergeLocations } from '../../utils/general'
import { Direction, LocationType, TileStatus } from '../../utils/types'
import { arrowKeyToCoordinates } from './movements'
import { findDirectionByKey } from './movementUtils'

export class MovementNode {
    public constructor(private info: GameComInfo) {}

    public move(key: ArrowKey) {
        if (this.info.player.isMoving) {
            return
        }

        const locationIncrement = arrowKeyToCoordinates[key]
        const newLocation = mergeLocations(this.info.player.getLocation, locationIncrement)
        const tileStatus: TileStatus = this.info.map.getTileStatus(newLocation)

        if (tileStatus === TileStatus.AVAILABLE) {
            this.emitMove(newLocation)
            return
        }
        if (tileStatus === TileStatus.OCCUPIED) {
            const tile = this.info.map.getTileByLocation(newLocation)
            const victimID = tile?.getOccupant
            if (!victimID) {
                return
            }
            const direction = findDirectionByKey(key)
            this.emitBounce(victimID, direction)
        }
    }

    private emitBounce(victimID: number, direction: Direction) {
        const victim = this.info.characters.find((character) => character.getID === victimID)
        if (!victim) {
            return
        }
        victim.receiveBounce(direction)
        this.info.socket.emit('bounce', victimID, direction)
    }

    private emitMove(newLocation: LocationType) {
        this.info.player.move(newLocation)
        this.info.socket.emit('move', this.info.player.getID, newLocation)
    }
}
