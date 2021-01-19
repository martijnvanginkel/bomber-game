import { Tile } from '../map/Tile'
import { map } from '../index'
import { mergeLocations } from './locations'
import { Direction, LocationType } from './types'
import { basic } from './abilities'

export interface AttackBlob {
    // index: number
    location: LocationType
    // prewait: number
    // afterwait: number
    // damage
}

// give basic attack as a dynamic parameter somehow
export const triggerAbility = async (playerLocation: LocationType, direction: Direction) => {
    
    let blobs = basic

    for (const blob of blobs) {
        const turnedLocation = turnLocationToDirection(blob.location, direction)
        const blobLocation = mergeLocations(turnedLocation, playerLocation)

        
        const tile = map.getTileByLocation(blobLocation)
        if (!tile) {
            continue
        }
        tile?.drawTile('yellow')
        setTimeout(() => {
            tile?.drawTile()
        }, 500);
    }
}

function turnLocationToDirection(location: LocationType, direction: Direction): LocationType {
    switch (direction) {
        case Direction.EAST:
            return {
                x: location.x,
                y: location.y
            }
        case Direction.WEST:
            return {
                x: location.x * -1,
                y: location.y
            }
        case Direction.NORTH:
            return {
                x: location.y,
                y: location.x * -1
            }
        case Direction.SOUTH:
            return { 
                x: location.y,
                y: location.x 
            }
    }
}
