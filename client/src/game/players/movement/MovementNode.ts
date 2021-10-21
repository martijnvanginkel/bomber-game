import { GameComInfo } from '../../Game'
import { Tile } from '../../map/Tile'
import { ArrowKey } from '../../managers/InputController'
import { mergeLocations } from '../../utils/general'
import { Direction, LocationType } from '../../utils/types'
import { directionToCoordinates } from './movements'
import { findDirectionByKey } from './movementUtils'

export class MovementNode {
    public constructor(private info: GameComInfo) {}

    public async move(key: ArrowKey) {
        if (this.info.player.isMoving) {
            return
        }

        const direction = findDirectionByKey(key)
        const tiles = this.getTwoTilesInDirection(direction)

        if (tiles[0].isOccupied) {
            const victimID = tiles[0].getOccupant!
            this.emitBounce(victimID, direction)
            return
        }

        await this.emitMove(tiles[0].getLocation)

        if (tiles[1].isOccupied) {
            const victimID = tiles[1].getOccupant!
            this.emitBounce(victimID, direction)
        }
    }

    private getTwoTilesInDirection(direction: Direction): Tile[] {
        const startLocation = this.info.player.getLocation
        const locationIncrement = directionToCoordinates[direction]
        const locationOne = mergeLocations(startLocation, locationIncrement)
        const locationTwo = mergeLocations(locationOne, locationIncrement)
        const tileOne = this.info.map.getTileByLocation(locationOne)
        const tileTwo = this.info.map.getTileByLocation(locationTwo)
        const tiles = [tileOne, tileTwo].filter((tile): tile is Tile => !!tile)
        return tiles
    }

    private emitBounce(victimID: number, direction: Direction) {
        const victim = this.info.characters.find((character) => character.getID === victimID)
        if (!victim) {
            return
        }
        victim.receiveBounce(direction)
        this.info.socket.emit('bounce', victimID, direction)
    }

    private async emitMove(newLocation: LocationType) {
        this.info.socket.emit('move', this.info.player.getID, newLocation)
        await this.info.player.move(newLocation)
    }
}
