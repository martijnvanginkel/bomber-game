import { Tile } from '../map/Tile'
import { map } from './../index'
import { mergeLocations } from './movements'
import { LocationType } from './types'

interface Attack {
    // index: number
    location: LocationType
    // prewait: number
    // afterwait: number
    // damage
}

function basicAttack(): Attack[] {
    const attacks = [
        {
            location: {
                x: 0,
                y: 1,
            }
        }
    ]
    return attacks
}

// give basic attack as a dynamic parameter somehow
export const triggerAbility = async (location: LocationType) => {

    const attacks = basicAttack()

    for (const attack of attacks) {
        // wait for prewait
        const attackLocation: LocationType = mergeLocations(location, attack.location)
        const tile = map.getTileByLocation(attackLocation)
        if (!tile) {
            continue
        }
        tile.drawTile('red')

        // wait for afterwait
    }

    basicAttack().forEach((attack: Attack) => {
        // wait for prewait
        // 

        // wait for afterwait
    })
}

