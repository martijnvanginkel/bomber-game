import { LocationType, Direction, TileStatus, ArrowKey } from '../utils/types'
import { CharacterType } from './actions/characters'
import { Tile } from '../map/Tile'
import { CharacterAnimator } from './CharacterAnimator'
import { Map } from './../map/Map'

export class Character {
    private location: LocationType
    private direction: Direction
    private character: CharacterType
    private animator: CharacterAnimator
    private moving: boolean

    constructor(protected ID: number, protected index: number, protected color: string, protected map: Map) {
        this.animator = new CharacterAnimator(color, map)
        this.character = CharacterType.BASIC
        this.location = { x: index, y: index }
        this.setMoving(false)
        this.spawn()
    }

    public get getID() {
        return this.ID
    }

    public get getLocation() {
        return this.location
    }

    protected get getDirection() {
        return this.direction
    }

    public get getCharacterType() {
        return this.character
    }

    public get isMoving() {
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

    public async move(newLocation: LocationType) {
        const oldLocation = this.getLocation

        const oldTile: Tile = this.map.getTileByLocation(oldLocation)!
        const newTile: Tile = this.map.getTileByLocation(newLocation)!

        oldTile.setUnoccupied()
        newTile.setOccupied(this.getID)

        this.setMoving(true)
        await this.animator.move(oldLocation, newLocation)
        this.setMoving(false)

        this.location = newLocation
        // if (direction) {
        //     this.direction = direction
        // }
    }

    // public async fireAbility(ability: Ability) {
    //     for await (const blob of ability) {
    //         const tile = this.map.getTileByLocation(blob.location)
    //         if (!tile) {
    //             continue
    //         }
    //         await waitForTime(blob.wait)
    //         tile?.drawTile('yellow')
    //         setTimeout(() => {
    //             tile?.drawTile()
    //         }, blob.duration)
    //     }
    // }

    // public receiveBounce(incomingDirection: Direction) {
    //     const newLocation: LocationType = mergeLocations(this.getLocation, directionToCoordinates[incomingDirection])
    //     const tileStatus: TileStatus = this.map.getTileStatus(newLocation)
    //     if (tileStatus === TileStatus.NONEXISTENT) {
    //         return
    //     }
    //     this.move(this.getLocation, newLocation, this.getID)
    // }
}
