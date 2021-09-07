import { LocationType, Direction, TileStatus } from '../utils/types'
import { Tile } from '../map/Tile'
import { CharacterAnimator } from './CharacterAnimator'
import { Map } from './../map/Map'
import { directionToCoordinates } from './movement/movements'
import { mergeLocations } from './../utils/general'
import { calculateSpawnPosition } from './../map/utils/calculateSpawnPosition'
import EventEmitter from 'events'

export class Character extends EventEmitter {
    private location: LocationType
    private direction: Direction
    private animator: CharacterAnimator
    private moving: boolean
    private health: number = 2

    constructor(
        protected ID: number,
        protected index: number, // order of clients that entered the game
        protected color: string,
        protected map: Map, // private lostHealthCallback: (health: number) => void,
    ) {
        super()
        this.animator = new CharacterAnimator(color, map)
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

    public get isMoving() {
        return this.moving
    }

    private setMoving(moving: boolean) {
        this.moving = moving
    }

    public spawn() {
        this.location = calculateSpawnPosition(this.map.getMapWidth, this.index)
        this.setMoving(false)

        const tile = this.map.getTileByLocation(this.location)
        tile?.setOccupied(this.getID)

        this.animator.instantiate(this.getLocation)
        this.direction = Direction.NORTH
    }

    public clearPosition() {
        const currentTile = this.map.getTileByLocation(this.getLocation)
        currentTile?.setUnoccupied()

        this.animator.clearCharacterLocation(this.getLocation)
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
            this.loseHealth()
            return
        }
        this.move(newLocation)
    }

    private loseHealth() {
        this.health -= 1

        const event = new CustomEvent('lost-health', {
            detail: {
                ID: this.getID,
                health: this.health,
            },
            bubbles: true,
            composed: true,
        })
        dispatchEvent(event)
        this.emit('lost-health', event)
    }
}
