import { LocationType } from '../../utils/types'
// import { map } from './../../../index'

export function mapLocationToCanvasLocation(location: LocationType): LocationType {
    const tileSize = 50 // change this
    return {
        x: location.x * tileSize,
        y: location.y * tileSize,
    }
}
