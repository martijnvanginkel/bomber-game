import { ClientInfo } from '../managers/MessageManager'
import { LocationType, Direction } from '../utils/types'
import { CharacterType } from './actions/characters'
import { map } from '../index'
import { Ability } from './actions/abilities'
import { waitForTime } from '../utils/general'
import { Tile } from '../map/Tile'
import { CharacterAnimator } from './CharacterAnimator'
import _ from 'lodash'

export abstract class Character {
    private location: LocationType
    private direction: Direction
    private character: CharacterType
    private animator: CharacterAnimator
    private moving: boolean

    constructor(protected clientInfo: ClientInfo, protected image: HTMLImageElement) {
        this.animator = new CharacterAnimator()
        this.character = CharacterType.BASIC
        this.location = { x: clientInfo.index, y: clientInfo.index }
        this.setMoving(false)
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

    protected get isMoving() {
        return this.moving
    }

    private setMoving(moving: boolean) {
        this.moving = moving
    }

    private spawn() {
        const tile = map.getTileByLocation(this.location)
        tile?.setOccupied(this.getID)

        this.animator.instantiate(this.getLocation)
        this.direction = Direction.NORTH
    }

    public async move(oldLocation: LocationType, newLocation: LocationType, ID: string, direction: Direction) {
        const oldTile: Tile = map.getTileByLocation(oldLocation)!
        const newTile: Tile = map.getTileByLocation(newLocation)!

        oldTile.setUnoccupied()
        newTile.setOccupied(ID)

        this.setMoving(true)
        await this.animator.move(oldLocation, newLocation)
        this.setMoving(false)

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
