import { ClientInfo } from "./services/MessageManager";
import { images, map } from './index'
import { Character } from "./Character";
import { moves, mergeLocations } from './movements'
import { Arrow, Direction } from "./utils/types";

export class Player extends Character {
    constructor(protected clientInfo: ClientInfo) {
        super(clientInfo, images.getImage('player'))
        this.movementInput()
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

        if (!map.availableLocation(newLocation)) {
            return
        }

        this.move(this.getLocation, newLocation, this.getID, direction)
    }
}