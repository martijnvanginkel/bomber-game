// import { Character } from "./Character";
import { ClientInfo } from "./services/MessageManager";
import { images } from './index'
import { Character } from "./Character";
import { move, Direction } from './movements'

export class Player extends Character {
    constructor(protected clientInfo: ClientInfo) {
        super(clientInfo, images.getImage('player'))
        // console.log('player here')
        // this.setImage(images.getImage('Player'))

        this.input()
    }

    private input() {
        document.addEventListener('keydown', (e) => {
            switch (e.code) {
                case 'ArrowLeft':
                    move(Direction.LEFT)
                    // this.decideMovement(-1, 0, 270)
                    break;
                case 'ArrowUp':
                    move(Direction.UP)
                    // this.decideMovement(0, -1, 0)
                    break;
                case 'ArrowRight':
                    move(Direction.RIGHT)
                    // this.decideMovement(1, 0, 90)
                    break;
                case 'ArrowDown':
                    move(Direction.DOWN)
                    // this.decideMovement(0, 1, 180)
                    break;
                default:
                    break;
            }
        })
    }




}