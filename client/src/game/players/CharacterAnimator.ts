import { mapLocationToCanvasLocation } from '../map/utils/general'
import { LocationType } from '../utils/types'
import { mergeLocations } from '../utils/general'
import _ from 'lodash'
import { Map } from './../map/Map'
import { Images } from '../images/Images'

export class CharacterAnimator {
    private resettingMovement: boolean = false
    private animation: any = undefined

    public constructor(protected color: string, private map: Map) {}

    private drawPosition(x: number, y: number) {
        console.log('draw position')
       //  this.map.getPlayerContext.drawImage(images.getImage('player'), x, y, this.map.tileSize, this.map.tileSize) // future image implementation
        this.map.getPlayerContext.beginPath()
        this.map.getPlayerContext.fillStyle = this.color
        this.map.getPlayerContext.rect(x, y, this.map.tileSize, this.map.tileSize)
        this.map.getPlayerContext.fill()
    }

    private async clearPosition(x: number, y: number) {
        this.map.getPlayerContext.clearRect(x, y, this.map.tileSize, this.map.tileSize)
    }

    public clearCharacterLocation(location: LocationType) {
        this.clearPosition(location.x * this.map.tileSize, location.y * this.map.tileSize)
    }

    public instantiate(location: LocationType) {
        this.drawPosition(location.x * this.map.tileSize, location.y * this.map.tileSize)
    }

    public resetMovement() {
        this.resettingMovement = true
    }

    public move(curLoc: LocationType, endLoc: LocationType) {
        let start = mapLocationToCanvasLocation(curLoc, this.map.tileSize)
        const end = mapLocationToCanvasLocation(endLoc, this.map.tileSize)
        const increment = this.getLocationIncrement(start, end)
        let firstFrame: boolean = true

        return new Promise<void>((resolve) => {
            const draw = () => {
                if (!firstFrame) {
                    this.clearPosition(start.x - increment.x, start.y - increment.y)
                }
                firstFrame = false
                if (this.resettingMovement) {
                    this.resettingMovement = false
                    //window.cancelAnimationFrame(this.animation)
                    //this.animation = undefined
                    resolve()
                    return
                }
                this.drawPosition(start.x, start.y)
                if (!_.isEqual(start, end)) {
                    start = mergeLocations(start, increment)
                    window.requestAnimationFrame(draw)
                    return
                }
                resolve()
            }
            this.animation = window.requestAnimationFrame(draw)
        })
    }

    private getLocationIncrement(start: LocationType, end: LocationType) {
        const increment = this.map.tileSize / 5

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
