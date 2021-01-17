import { Tile } from '../map/Tile'
import { map } from './../index'
import { mergeLocations } from './movements'
import { Direction, LocationType } from './types'

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
                x: 1,
                y: 0,
            }
        }
    ]
    return attacks
}

function formatAttackLocationToDirection(attackLocation: LocationType, direction: Direction) {
    
    // switch statement?
    if (direction === Direction.EAST) {
        return attackLocation
    }
    else if (direction === Direction.WEST) {
        return {
            x: attackLocation.x * -1,
            y: attackLocation.y,
        }
    }
    else if (direction === Direction.NORTH) {
        return {
            x: attackLocation.y,
            y: attackLocation.x * -1,
        }
    }
    else if (direction === Direction.SOUTH) {
        return {
            x: attackLocation.y,
            y: attackLocation.x,
        }
    }

    return attackLocation

    // north = { x: 0, y: -1 }
    // south = { x: 0, y: 1 }
    // east = { x: 1, y: 0 }
    // west = { x: -1, y: 0 }

    // return attackLocation
}

// give basic attack as a dynamic parameter somehow
export const triggerAbility = async (location: LocationType, direction: Direction) => {

    let attacks = basicAttack()[0].location

    // console.log(attacks)
    console.log(location)
    console.log(direction)

    // console.log(formatAttackLocationToDirection(attacks, direction))

    const newFormat = formatAttackLocationToDirection(attacks, direction)

    const attackLocation = mergeLocations(newFormat, location)
    console.log(attackLocation)

    const tile = map.getTileByLocation(attackLocation)

    tile?.drawTile('red')



    // attacks = formatAttackLocationToDirection

    // for (const attack of attacks) {
    //     const formatLocation = formatAttackLocationToDirection(attack.location, direction)
    //     // wait for prewait
    //     const attackLocation: LocationType = mergeLocations(formatLocation, attack.location)
    //     const tile = map.getTileByLocation(attackLocation)
    //     if (!tile) {
    //         continue
    //     }
    //     tile.drawTile('red')

    //     // wait for afterwait
    // }

}

