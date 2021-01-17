import { ClientInfo } from "./services/MessageManager";
import { images, map } from './index'
import { Character } from "./Character";
import { moves, mergeLocations } from './utils/movements'
import { Arrow, Direction } from "./utils/types";
import { EventEmitter } from 'events'

export class Player extends Character {

    private events: EventEmitter

    constructor(protected clientInfo: ClientInfo) {
        super(clientInfo, images.getImage('player'))
        this.events = new EventEmitter()
        this.movementInput()
    }

    public get playerEvents() {
        return this.events
    }

    private movementInput() {
        document.addEventListener('keydown', (e) => {
            switch (e.code) {
                case 'ArrowLeft':
                    this.preMove(Arrow.LEFT, Direction.WEST)
                    break;
                case 'ArrowUp':
                    this.preMove(Arrow.UP, Direction.NORTH)
                    break;
                case 'ArrowRight':
                    this.preMove(Arrow.RIGHT, Direction.EAST)
                    break;
                case 'ArrowDown':
                    this.preMove(Arrow.DOWN, Direction.SOUTH)
                    break;
            }
        })
    }

    private preMove(arrow: Arrow, direction: Direction) {
        const newLocation = mergeLocations(this.getLocation, moves.basic[arrow])
        console.log('premove')

        if (!map.availableLocation(newLocation)) {
            return
        }

        this.events.emit('move', { 
            oldLocation: this.getLocation,
            newLocation: newLocation,
            ID: this.getID,
            direction: direction,
        })

        this.move(this.getLocation, newLocation, this.getID, direction)
    }
}