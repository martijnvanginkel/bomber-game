import { GameComInfo } from '../../Game'
import { mergeLocations } from '../../utils/general'
import { Direction } from '../../utils/types'
import { AbilityKey, ArrowKey } from '../../managers/InputController'
import { directionToCoordinates } from '../movement/movements'
import { findDirectionByKey } from '../movement/movementUtils'
import { Tile } from '../../map/Tile' 
import { DirectionAbility } from './DirectionAbility'

export class TackleAbility2 extends DirectionAbility {

    public constructor(protected abilityKey: AbilityKey, protected info: GameComInfo, protected cooldownTime: number) {
        super(abilityKey, info, cooldownTime)
    }

    public fire(arrowKey: ArrowKey) {
        this.trigger()  
        this.handleLogic(arrowKey)
    }

    public async trigger() {
        //if (!super.isActivated) {
         //   return
        //}
        super.trigger()
        //this.handleLogic(arrowKey)
    }

    private async handleLogic(key: ArrowKey) { 
        const direction = findDirectionByKey(key)
        const tiles = this.getThreeTilesInDirection(direction)

        if (tiles[0].isOccupied) {
            const victimID = tiles[0].getOccupant!
            super.emitBounce(victimID, direction, 3)
            return
        }

        await super.emitMove(tiles[0].getLocation)

        if (tiles[1].isOccupied) {
            const victimID = tiles[1].getOccupant!
            super.emitBounce(victimID, direction, 2)
        }
    }

    private getThreeTilesInDirection(direction: Direction) {
        const startLocation = this.info.player.getLocation
        const locationIncrement = directionToCoordinates[direction]
        const locationOne = mergeLocations(startLocation, locationIncrement)
        const locationTwo = mergeLocations(locationOne, locationIncrement)
        const locationThree = mergeLocations(locationTwo, locationIncrement)
        const tileOne = this.info.map.getTileByLocation(locationOne)
        const tileTwo = this.info.map.getTileByLocation(locationTwo)
        const tileThree = this.info.map.getTileByLocation(locationThree)
        const tiles = [tileOne, tileTwo, tileThree].filter((tile): tile is Tile => !!tile)
        return tiles
    }
}
