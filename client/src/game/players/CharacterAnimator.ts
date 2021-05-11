import { mapLocationToCanvasLocation } from '../map/utils/general'
import { LocationType } from '../utils/types'
import { mergeLocations } from '../utils/general'
import _ from 'lodash'
import { Map } from './../map/Map'

export class CharacterAnimator {
    public constructor(protected color: string, private map: Map) {}

    private drawPosition(x: number, y: number) {
        // map.getPlayerContext.drawImage(this.image, x, y, 50, 50) // future image implementation
        this.map.getPlayerContext.beginPath()
        this.map.getPlayerContext.fillStyle = this.color
        this.map.getPlayerContext.rect(x, y, 50, 50) // 50 for now cause of tile size
        this.map.getPlayerContext.fill()
    }

    private clearPosition(x: number, y: number) {
        this.map.getPlayerContext.clearRect(x, y, 50, 50)
    }

    public instantiate(location: LocationType) {
        this.drawPosition(location.x * 50, location.y * 50) // 50 for now
    }

    public move(curLoc: LocationType, endLoc: LocationType) {
        let start = mapLocationToCanvasLocation(curLoc)
        const end = mapLocationToCanvasLocation(endLoc)
        const increment = this.getLocationIncrement(start, end)
        let firstFrame: boolean = true

        return new Promise<void>((resolve) => {
            const draw = () => {
                if (!firstFrame) {
                    this.clearPosition(start.x - increment.x, start.y - increment.y)
                }
                firstFrame = false
                this.drawPosition(start.x, start.y)
                if (!_.isEqual(start, end)) {
                    start = mergeLocations(start, increment)
                    window.requestAnimationFrame(draw)
                    return
                }
                resolve()
            }
            window.requestAnimationFrame(draw)
        })
    }

    private getLocationIncrement(start: LocationType, end: LocationType) {
        const increment = 10

        const xMultiplier: number = start.x <= end.x ? 1 : -1
        const yMultiplier: number = start.y <= end.y ? 1 : -1

        const xDiff: number = Math.abs(start.x - end.x) * xMultiplier
        const yDiff: number = Math.abs(start.y - end.y) * yMultiplier

        const xIncrement = xDiff === 0 ? 0 : increment * xMultiplier
        const yIncrement = yDiff === 0 ? 0 : increment * yMultiplier

        return {
            x: xIncrement,
            y: yIncrement,
        }
    }
}
