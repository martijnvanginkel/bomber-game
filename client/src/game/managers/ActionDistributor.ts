// import { Character } from '../players/Character'
// import { Enemy } from '../players/Enemy'
// import { Player } from '../players/Player'
// import { BounceData, ShareLocationType } from '../utils/types'

// export class ActionDistributor {
//     private player: Player
//     private enemies: Enemy[]
//     private characters: (Player | Enemy)[]

//     constructor() {
//         this.enemies = new Array()
//         this.characters = new Array()
//     }

//     public addPlayer(player: Player) {
//         this.player = player
//         this.characters.push(player)
//     }

//     public addEnemy(enemy: Enemy) {
//         this.enemies.push(enemy)
//         this.characters.push(enemy)
//     }

//     public moveEnemy(data: ShareLocationType) {
//         this.enemies.forEach((enemy: Enemy) => enemy.move(data.oldLocation, data.newLocation, data.ID, data.direction))
//     }

//     public moveCharacterByBounce(data: BounceData) {
//         const character = this.characters.find((char) => char.getID === data.victimID)
//         if (!character) {
//             throw new Error('No character found for bounce')
//         }
//         character.receiveBounce(data.incomingDirection)
//     }
// }
