import { ClientInfo } from '../managers/MessageManager'
import { LocationType, Direction } from '../utils/types'
import { CharacterType } from './actions/characters'
import { map } from '../index'
import { Ability } from './actions/abilities'
import { waitForTime } from '../utils/general'
import { Tile } from '../map/Tile'

export abstract class Character {
    private location: LocationType
    private direction: Direction
    private character: CharacterType

    constructor(
        protected clientInfo: ClientInfo,
        protected image: HTMLImageElement,
    ) {
        this.character = CharacterType.BASIC
        this.location = { x: clientInfo.index, y: clientInfo.index }
        this.spawn()
    }

    protected get getClientInfo() {
        return this.clientInfo
    }

    protected get getID() {
        return this.clientInfo.ID
    }

    protected get getLocation() {
        return this.location
    }

    protected get getDirection() {
        return this.direction
    }

    protected get getCharacterType() {
        return this.character
    }

    private spawn() {
        const tile = map.getTileByLocation(this.location)
        tile?.setOccupied(this.getID)
        // this.draw()
        this.direction = Direction.NORTH
    }

    // private drawImageRot(
    //     img: HTMLImageElement,
    //     x: number,
    //     y: number,
    //     width: number,
    //     height: number,
    //     deg: number,
    // ) {
    //     const rad = (deg * Math.PI) / 180
    //     map.getContext.save()
    //     map.getContext.translate(x + width / 2, y + height / 2)
    //     map.getContext.rotate(rad)
    //     map.getContext.drawImage(
    //         img,
    //         (width / 2) * -1,
    //         (height / 2) * -1,
    //         width,
    //         height,
    //     )
    //     map.getContext.restore()
    // }

    // private draw(direction: Direction) {
    //     this.drawImageRot(
    //         this.image,
    //         this.location.x * map.tileSize,
    //         this.location.y * map.tileSize,
    //         50,
    //         50,
    //         direction,
    //     )
    // }

    private draw(x: number, y: number) {
        map.getPlayerContext.beginPath()
        map.getPlayerContext.fillStyle = 'red'
        map.getPlayerContext.rect(x, y, 50, 50) // 50 for now cause of tile size
        map.getPlayerContext.fill()
    }

    // might want to move this somewhere else
    private decideLocationIncrement(
        oldLocation: LocationType,
        newLocation: LocationType,
    ) {
        const xDiff: number = Math.abs(oldLocation.x - newLocation.x)
        const yDiff: number = Math.abs(oldLocation.y - newLocation.y)

        const xNegative: number = oldLocation.x < newLocation.x ? 1 : -1
        const yNegative: number = oldLocation.y < newLocation.y ? 1 : -1

        console.log(xDiff, yDiff)

        return {
            increment: {
                x: xDiff === 0 ? 0 : (xDiff / 5) * xNegative,
                y: yDiff === 0 ? 0 : (yDiff / 5) * yNegative,
            },
        }
    }

    public move(
        oldLocation: LocationType,
        newLocation: LocationType,
        ID: string,
        direction: Direction,
    ) {
        // non-existing location is already filtered in Player
        const oldTile: Tile = map.getTileByLocation(oldLocation)!
        const newTile: Tile = map.getTileByLocation(newLocation)!

        oldTile.setUnoccupied()
        newTile.setOccupied(ID)

        let oldPos: LocationType = oldTile.getCanvasPosition
        const newPos: LocationType = newTile.getCanvasPosition

        const increment: LocationType = this.decideLocationIncrement(
            oldPos,
            newPos,
        )

        // console.log(this.decideLocationIncrement(oldPos, newPos))

        // this.location = newLocation
        // this.direction = direction
        // this.draw(direction)

        console.log(oldPos, newPos)

        function draw() {
            oldPos.x += increment.x
            oldPos.y += increment.y
            // oldPos.x += increment.x
            // oldPos.y += increment.y
            // let x = 20
            // requestAnimationFrame(draw)
            // map.getContext.clearRect(20, 20, 20, 20)
            map.getPlayerContext.beginPath()
            map.getPlayerContext.fillStyle = '#0095DD'
            map.getPlayerContext.rect(oldPos.x, oldPos.y, 20, 20)
            map.getPlayerContext.fill()
            if (oldPos.x !== newPos.x && oldPos.y !== newPos.y) {
                // x += 2
                oldPos.x += increment.x
                oldPos.y += increment.y
                // oldPos
                window.requestAnimationFrame(draw)
            }
            // x += (timestamp - last) / 10
            // last = timestamp
        }
        window.requestAnimationFrame(draw)

        this.direction = direction
    }

    public async fireAbility(ability: Ability) {
        for await (const blob of ability) {
            const tile = map.getTileByLocation(blob.location)
            if (!tile) {
                continue
            }
            await waitForTime(blob.wait)
            tile?.drawTile('yellow')
            setTimeout(() => {
                tile?.drawTile()
            }, blob.duration)
        }
    }
}
