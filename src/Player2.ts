// import { game, connection } from './index'
// import { ClientInfo, ShareLocationType, LocationType } from './services/MessageManager'

// export class Player {

//     private location: LocationType
//     private direction: number
//     private image: HTMLImageElement
//     private client: ClientInfo
//     private me: boolean

//     constructor(client: ClientInfo) {
//         this.client = client
//         this.image = game.images.getImage('player')
//         this.location = {
//             xPos: client.index,
//             yPos: client.index,
//         }
//         this.spawnPlayer()
//     }

//     get getID() {
//         return this.client.ID
//     }

//     get getClientInfo() {
//         return this.client
//     }

//     get isMe() {
//         return this.me
//     }

//     set isMe(itsMe) {
//         this.me = itsMe
//     }

//     private spawnPlayer() {
//         game.map.setTileOccupied(this.location, this.getID) // this should be a general search
//         this.drawPlayer(0)
//         this.watchInput()
//     }

//     private drawImageRot(img: HTMLImageElement, x: number, y: number, width: number, height: number, deg: number){
//         // Store the current context state (i.e. rotation, translation etc..)
//         game.context.save()
    
//         //Convert degrees to radian 
//         var rad = deg * Math.PI / 180;
    
//         //Set the origin to the center of the image
//         game.context.translate(x + width / 2, y + height / 2);
    
//         //Rotate the canvas around the origin
//         game.context.rotate(rad);
    
//         //draw the image    
//         game.context.drawImage(img,width / 2 * (-1),height / 2 * (-1),width,height);
    
//         // Restore canvas state as saved from above
//         game.context.restore();
//     }

//     private drawPlayer(direction: number) {
//         this.drawImageRot(this.image, this.location.xPos * game.map.tileSize, this.location.yPos * game.map.tileSize, 50, 50, direction)
//     }

//     private decideMovement(xIncrement: number, yIncrement: number, direction: number) {
//         if (!this.isMe) {
//             return
//         }

//         const shareLocation: ShareLocationType = {
//             oldLoc: this.location,
//             newLoc: {
//                 xPos: this.location.xPos + xIncrement,
//                 yPos: this.location.yPos + yIncrement,
//             },
//             ID: this.getID,
//             direction: direction,
//         }
        
//         if (!game.map.availableTile(shareLocation.newLoc.xPos, shareLocation.newLoc.yPos)) {
//             return
//         }
   
//         connection.shareLocation(shareLocation)
//         this.movePlayer(shareLocation)        
//     }

//     public movePlayer(shareLocation: ShareLocationType) {
//         game.map.setNewTileOccupied(shareLocation.oldLoc, shareLocation.newLoc, shareLocation.ID)
//         this.location = shareLocation.newLoc
//         this.direction = shareLocation.direction
//         this.drawPlayer(shareLocation.direction)
//     }

//     private watchInput() {
//         document.addEventListener('keydown', (e) => {
//             switch (e.code) {
//                 case 'ArrowLeft':
//                     this.decideMovement(-1, 0, 270)
//                     break;
//                 case 'ArrowUp':
//                     this.decideMovement(0, -1, 0)
//                     break;
//                 case 'ArrowRight':
//                     this.decideMovement(1, 0, 90)
//                     break;
//                 case 'ArrowDown':
//                     this.decideMovement(0, 1, 180)
//                     break;
//                 default:
//                     break;
//             }
//         })
//     }
// }