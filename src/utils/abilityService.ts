import { Tile } from '../map/Tile'
import { map } from '../index'
import { mergeLocations } from './locations'
import { Direction, LocationType } from './types'
import { basic, spin } from './abilities'

export interface AttackBlob {
    // index: number
    location: LocationType
    wait: number
    length: number
    // afterwait: number
    // damage
}

// give basic attack as a dynamic parameter somehow
export const triggerAbility = async (playerLocation: LocationType, direction: Direction) => {
    const blobs = formatBlobsToLocation(spin, playerLocation, direction)
    for await (const blob of blobs) {
        const tile = map.getTileByLocation(blob.location)
        if (!tile) {
            continue
        }

        await waitForTime(blob.wait)
        
        // if (blob.wait !== 0) {
        //     await new Promise(resolve => setTimeout(resolve, blob.wait));
        // }
        console.log('hoi')

        tile?.drawTile('yellow')
            
        setTimeout(() => {
            tile?.drawTile()
        }, 300);
        

    }
}

function waitForTime(length: number) {
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve()
        }, length)
    }); 
}

function formatBlobsToLocation(blobs: AttackBlob[], playerLocation: LocationType, direction: Direction): AttackBlob[] {
    return blobs.map((blob: AttackBlob) => {
        const turnedBlobLocation = turnLocationToDirection(blob.location, direction)
        const finalLocation = mergeLocations(turnedBlobLocation, playerLocation)
        return {
            location: finalLocation,
            wait: blob.wait,
            length: blob.length
        } as AttackBlob
    })
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
