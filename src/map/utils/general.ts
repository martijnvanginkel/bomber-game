import { LocationType } from '../../utils/types'
import { map } from './../../index'

export function mapLocationToCanvasLocation(location: LocationType): LocationType {
    const tileSize = map.tileSize
    return {
        x: location.x * tileSize,
        y: location.y * tileSize,
    }
}
