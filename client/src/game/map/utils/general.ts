import { LocationType } from '../../utils/types'

export function mapLocationToCanvasLocation(location: LocationType, tileSize: number): LocationType {
    return {
        x: location.x * tileSize,
        y: location.y * tileSize,
    }
}
