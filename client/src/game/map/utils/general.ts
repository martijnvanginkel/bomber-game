import { LocationType } from '../../utils/types'

export function mapLocationToCanvasLocation(location: LocationType): LocationType {
    const tileSize = 50 // change this
    return {
        x: location.x * tileSize,
        y: location.y * tileSize,
    }
}
