import { mergeLocations } from '../../../utils/general'
import { Direction, LocationType } from '../../../utils/types'
import { Ability, AttackBlob } from '../abilities'

export function formatAbilityToLocation(
    ability: Ability,
    playerLocation: LocationType,
    direction: Direction,
): Ability {
    return ability.map((blob: AttackBlob) => {
        const turnedBlobLocation = turnLocationToDirection(
            blob.location,
            direction,
        )
        const finalLocation = mergeLocations(turnedBlobLocation, playerLocation)
        return {
            location: finalLocation,
            wait: blob.wait,
            duration: blob.duration,
        } as AttackBlob
    })
}

function turnLocationToDirection(
    location: LocationType,
    direction: Direction,
): LocationType {
    switch (direction) {
        case Direction.EAST:
            return {
                x: location.x,
                y: location.y,
            }
        case Direction.WEST:
            return {
                x: location.x * -1,
                y: location.y,
            }
        case Direction.NORTH:
            return {
                x: location.y,
                y: location.x * -1,
            }
        case Direction.SOUTH:
            return {
                x: location.y,
                y: location.x,
            }
    }
}
