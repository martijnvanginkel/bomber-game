import { ClientInfo } from '../managers/MessageDistributor'
import { LocationType, Direction, TileStatus } from '../utils/types'
import { CharacterType } from './actions/characters'
// import { map } from '../../index'
import { Ability } from './actions/abilities'
import { mergeLocations, waitForTime } from '../utils/general'
import { Tile } from '../map/Tile'
import { CharacterAnimator } from './CharacterAnimator'
import { directionToCoordinates } from './actions/movements'
import { Map } from './../map/Map'

export abstract class Character {
    private location: LocationType
    private direction: Direction
    private character: CharacterType
    private animator: CharacterAnimator
    private moving: boolean

    constructor(protected image: HTMLImageElement, protected color: string, protected map: Map) {
        this.animator = new CharacterAnimator(color, map)
        this.character = CharacterType.BASIC
        // this.location = { x: clientInfo.index, y: clientInfo.index }
        this.location = { x: 0, y: 0 }
        this.setMoving(false)
        this.spawn()
    }

    // protected get getClientInfo() {
    //     return this.clientInfo
    // }

    public get getID() {
        return 'asf' //this.clientInfo.ID
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
        const tile = this.map.getTileByLocation(this.location)
        tile?.setOccupied(this.getID)

        this.animator.instantiate(this.getLocation)
        this.direction = Direction.NORTH
    }

    public async move(oldLocation: LocationType, newLocation: LocationType, ID: string, direction?: Direction) {
        const oldTile: Tile = this.map.getTileByLocation(oldLocation)!
        const newTile: Tile = this.map.getTileByLocation(newLocation)!

        oldTile.setUnoccupied()
        newTile.setOccupied(ID)

        this.setMoving(true)
        await this.animator.move(oldLocation, newLocation)
        this.setMoving(false)

        this.location = newLocation
        if (direction) {
            this.direction = direction
        }
    }

    public async fireAbility(ability: Ability) {
        for await (const blob of ability) {
            const tile = this.map.getTileByLocation(blob.location)
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

    public receiveBounce(incomingDirection: Direction) {
        const newLocation: LocationType = mergeLocations(this.getLocation, directionToCoordinates[incomingDirection])
        const tileStatus: TileStatus = this.map.getTileStatus(newLocation)
        if (tileStatus === TileStatus.NONEXISTENT) {
            return
        }
        this.move(this.getLocation, newLocation, this.getID)
    }
}
