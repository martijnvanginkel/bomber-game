import { ClientInfo } from "./services/MessageManager";
import { images, map } from './index'
import { Character } from "./Character";
import { moves } from './utils/movements'
import { Key, Direction } from "./utils/types";
import { EventEmitter } from 'events'
import { triggerAbility } from './utils/abilityService'
import { mergeLocations } from "./utils/locations";

export class Player extends Character {

    private events: EventEmitter

    constructor(protected clientInfo: ClientInfo) {
        super(clientInfo, images.getImage('player'))
        this.events = new EventEmitter()
        this.watchInput()
    }

    public get playerEvents() {
        return this.events
    }

    private watchInput() {
        document.addEventListener('keydown', (e) => {
            switch (e.code) {
                case 'ArrowLeft':
                    this.preMove(Key.LEFT, Direction.WEST)
                    break
                case 'ArrowUp':
                    this.preMove(Key.UP, Direction.NORTH)
                    break
                case 'ArrowRight':
                    this.preMove(Key.RIGHT, Direction.EAST)
                    break
                case 'ArrowDown':
                    this.preMove(Key.DOWN, Direction.SOUTH)
                    break
                case 'KeyQ':
                    this.preAbility()
                    break
                case 'KeyW':
                    // this.preAbility()
                    break
                // case 'KeyE':
                //     // this.preAbility()
                //     break
                // case 'KeyR':
                //     // this.preAbility()
                //     break
            }
        })
    }

    // bepaal tiles eerst met een soort tekening die preload voor de game start
    // bepaal de volgorde van de tiles (zelfde nummer === zelfde moment)
    // bepaal interval tussen tiles
    // bepaal interval voor ability

    

    private preAbility() {

        // give type of player to constructor of Character

        // send it here to the triggerAbility

        // location, direction, type of player, key
        triggerAbility(this.getLocation, this.getDirection)
    }

    private preMove(key: Key, direction: Direction) {
        const newLocation = mergeLocations(this.getLocation, moves.basic[key])

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