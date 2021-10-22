import { GameComInfo } from '../../Game'
import { Direction } from '../../utils/types'
import { AbilityKey } from '../../managers/InputController'
import { InstantAbility } from './InstantAbility'
import { LocationType } from '../../utils/types'

export class SmashAbility extends InstantAbility{

    public constructor(protected abilityKey: AbilityKey, protected info: GameComInfo) {
        super(abilityKey, info, 5)
    }

    public trigger() {
        super.trigger()
        this.handleLogic()
    }

    private handleLogic() {
        const startLoc = this.info.player.getLocation
        
        const locations: { location: LocationType, direction: Direction }[] = [
            // inner circle
            { location: { x: startLoc.x, y: startLoc.y - 1 }, direction: Direction.NORTH },
            { location: { x: startLoc.x + 1, y: startLoc.y - 1}, direction: Direction.NORTH },
            { location: { x: startLoc.x + 1, y: startLoc.y }, direction: Direction.EAST },
            { location: { x: startLoc.x + 1, y: startLoc.y + 1 }, direction: Direction.SOUTH },
            { location: { x: startLoc.x, y: startLoc.y + 1 }, direction: Direction.SOUTH }, 
            { location: { x: startLoc.x - 1, y: startLoc.y + 1 }, direction: Direction.SOUTH },
            { location: { x: startLoc.x - 1, y: startLoc.y }, direction: Direction.WEST }, 
            { location: { x: startLoc.x - 1, y: startLoc.y - 1 }, direction: Direction.NORTH}, 
            // outer circle
            { location: { x: startLoc.x, y: startLoc.y - 2 }, direction: Direction.NORTH },
            { location: { x: startLoc.x + 1, y: startLoc.y - 2 }, direction: Direction.NORTH },
            { location: { x: startLoc.x + 2, y: startLoc.y - 2 }, direction: Direction.NORTH },
            { location: { x: startLoc.x + 2, y: startLoc.y - 1 }, direction: Direction.EAST },
            { location: { x: startLoc.x + 2, y: startLoc.y }, direction: Direction.EAST },
            { location: { x: startLoc.x + 2, y: startLoc.y + 1 }, direction: Direction.EAST },
            { location: { x: startLoc.x + 2, y: startLoc.y + 2 }, direction: Direction.SOUTH },
            { location: { x: startLoc.x + 1, y: startLoc.y + 2 }, direction: Direction.SOUTH },
            { location: { x: startLoc.x, y: startLoc.y + 2 }, direction: Direction.SOUTH },
            { location: { x: startLoc.x - 1, y: startLoc.y + 2 }, direction: Direction.SOUTH },
            { location: { x: startLoc.x - 2, y: startLoc.y + 2 }, direction: Direction.SOUTH },
            { location: { x: startLoc.x - 2, y: startLoc.y + 1 }, direction: Direction.WEST },
            { location: { x: startLoc.x - 2, y: startLoc.y }, direction: Direction.WEST },
            { location: { x: startLoc.x - 2, y: startLoc.y - 1 }, direction: Direction.WEST },
            { location: { x: startLoc.x - 2, y: startLoc.y - 2 }, direction: Direction.NORTH },
            { location: { x: startLoc.x - 1, y: startLoc.y - 2 }, direction: Direction.NORTH }
        ]
 
        for (const location of locations) {
            const tile = this.info.map.getTileByLocation(location.location)
            if (!tile) {
                continue
            }
            if (tile.getOccupant) {
                this.emitBounce(tile.getOccupant, location.direction)
                return
            }
            console.log(tile.isOccupied)
        }
    }
}
