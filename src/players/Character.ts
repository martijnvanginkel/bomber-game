import { ClientInfo } from '../managers/MessageManager'
import { LocationType, Direction } from '../utils/types'
import { CharacterType } from './actions/characters'
import { map } from '../index'
import { Ability } from './actions/abilities'
import { waitForTime } from '../utils/general'

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
        this.draw(Direction.NORTH)
        this.direction = Direction.NORTH
    }

    private drawImageRot(
        img: HTMLImageElement,
        x: number,
        y: number,
        width: number,
        height: number,
        deg: number,
    ) {
        const rad = (deg * Math.PI) / 180
        map.getContext.save()
        map.getContext.translate(x + width / 2, y + height / 2)
        map.getContext.rotate(rad)
        map.getContext.drawImage(
            img,
            (width / 2) * -1,
            (height / 2) * -1,
            width,
            height,
        )
        map.getContext.restore()
    }

    private draw(direction: Direction) {
        this.drawImageRot(
            this.image,
            this.location.x * map.tileSize,
            this.location.y * map.tileSize,
            50,
            50,
            direction,
        )
    }

    public move(
        oldLocation: LocationType,
        newLocation: LocationType,
        ID: string,
        direction: Direction,
    ) {
        const oldTile = map.getTileByLocation(oldLocation)
        const newTile = map.getTileByLocation(newLocation)
        oldTile?.setUnoccupied()
        newTile?.setOccupied(ID)
        this.location = newLocation
        this.direction = direction
        this.draw(direction)
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
