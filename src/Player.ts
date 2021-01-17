// import { Character } from "./Character";
import { ClientInfo } from "./services/MessageManager";
import { images, map } from './index'
import { Character } from "./Character";
import { moves, Direction, mergeLocations } from './movements'
import { LocationType } from "./utils/types";

export class Player extends Character {
    constructor(protected clientInfo: ClientInfo) {
        super(clientInfo, images.getImage('player'))
        this.input()
    }

    private input() {
        document.addEventListener('keydown', (e) => {
            switch (e.code) {
                case 'ArrowLeft':
                    // move(Direction.LEFT)
                    this.preMove(Direction.LEFT)
                    // this.decideMovement(-1, 0, 270)
                    break;
                case 'ArrowUp':
                    this.preMove(Direction.UP)
                    // this.decideMovement(0, -1, 0)
                    break;
                case 'ArrowRight':
                    this.preMove(Direction.RIGHT)
                    // this.decideMovement(1, 0, 90)
                    break;
                case 'ArrowDown':
                    this.preMove(Direction.DOWN)
                    // this.decideMovement(0, 1, 180)
                    break;
            }
        })
    }

    private preMove(direction: Direction) {

        const newLocation = mergeLocations(this.getLocation, moves.basic[direction])

        if (!map.availableLocation(newLocation)) {
            return
        }

        this.move(this.getLocation, newLocation, this.getID)
    }
}