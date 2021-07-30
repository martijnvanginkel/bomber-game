import { LocationType, Direction, TileStatus } from '../utils/types'
import { CharacterType } from './actions/characters'
import { Tile } from '../map/Tile'
import { CharacterAnimator } from './CharacterAnimator'
import { Map } from './../map/Map'
import { directionToCoordinates } from './actions/movements'
import { mergeLocations } from './../utils/general'

export class Character {
    private location: LocationType
    private direction: Direction
    private character: CharacterType
    private animator: CharacterAnimator
    private moving: boolean

    constructor(
        protected ID: number,
        protected index: number,
        protected color: string,
        protected map: Map,
        private diedCallback: () => void,
    ) {
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
        if (this.isMoving) {
            // clear position to the next point
            this.animator.resetMovement()
        }

        const oldLocation = this.getLocation

        const oldTile: Tile = this.map.getTileByLocation(oldLocation)!
        const newTile: Tile = this.map.getTileByLocation(newLocation)!

        oldTile.setUnoccupied()
        newTile.setOccupied(this.getID)

        this.setMoving(true)
        await this.animator.move(oldLocation, newLocation)
        this.setMoving(false)

        this.location = newLocation
    }

    public receiveBounce(incomingDirection: Direction) {
        const newLocation: LocationType = mergeLocations(this.getLocation, directionToCoordinates[incomingDirection])
        const tileStatus: TileStatus = this.map.getTileStatus(newLocation)
        if (tileStatus === TileStatus.NONEXISTENT) {
            this.diedCallback()
            return
        }
        this.move(newLocation)
    }
}
