import { ClientInfo } from '../managers/MessageManager'
import { LocationType, Direction } from '../utils/types'
import { CharacterType } from './actions/characters'
import { map } from '../index'
import { Ability } from './actions/abilities'
import { waitForTime } from '../utils/general'
import { Tile } from '../map/Tile'
import _ from 'lodash'

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
        map.getPlayerContext.fillStyle = '0095DD'
        map.getPlayerContext.rect(x, y, 50, 50) // 50 for now cause of tile size
        map.getPlayerContext.fill()
    }

    private moveThroughTiles(tiles: Tile[]) {
        const increment: number = 50 / 10 // tilesize = 50

        // callback at the end of every tile?
        const firstTile = tiles[0]
        const secondTile = tiles[1]

        const firstPos = firstTile.getCanvasPosition
        const secondPos = secondTile.getCanvasPosition

        const xNegative: number = firstPos.x <= secondPos.x ? 1 : -1
        const yNegative: number = firstPos.y <= secondPos.y ? 1 : -1

        const xDiff: number = Math.abs(firstPos.x - secondPos.x) * xNegative
        const yDiff: number = Math.abs(firstPos.y - secondPos.y) * yNegative

        const xIncrement = xDiff === 0 ? 0 : increment * xNegative
        const yIncrement = yDiff === 0 ? 0 : increment * yNegative

        let startLoc = firstPos
        const endLoc = secondPos

        function draw() {
            map.getPlayerContext.clearRect(
                startLoc.x - xIncrement,
                startLoc.y - yIncrement,
                50,
                50,
            )
            map.getPlayerContext.beginPath()
            map.getPlayerContext.fillStyle = '#0095DD'
            map.getPlayerContext.rect(startLoc.x, startLoc.y, 50, 50)
            map.getPlayerContext.fill()
            if (!_.isEqual(startLoc, endLoc)) {
                startLoc.x = startLoc.x + xIncrement
                startLoc.y = startLoc.y + yIncrement
                window.requestAnimationFrame(draw)
            }
        }
        window.requestAnimationFrame(draw)
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

        this.moveThroughTiles([oldTile, newTile])

        this.location = newLocation
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
