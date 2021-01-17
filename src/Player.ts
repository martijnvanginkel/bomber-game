// import { Character } from "./Character";
import { ClientInfo } from "./services/MessageManager";
import { images } from './index'
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

        

        // const newLocation = mergeLocations

        // const newLocation = fruits.reduce((basket, fruit) => {
        //     for (const [fruitName, fruitCount] of Object.entries(fruit)) {
        //         if (!basket[fruitName]) {
        //             basket[fruitName] = 0;
        //         }
        
        //         basket[fruitName] += fruitCount;
        //     }
        
        //     return basket;
        // }, {});

        // const newLocation: LocationType = {...this.getLocation, ...moves.basic[direction] }

        // const newLocation = this.getLocation => Object.values(moves.basic[direction]).reduce((a, b) => a + b);
        // const newLocation = this.getLocation + moves.basic[direction]

        // const newLocation = this.getLocation + moves.basic[direction]

        // moves.basic[direction]

        // console.log(newLocation)
        // Object.keys(moves.basic).
    }




}