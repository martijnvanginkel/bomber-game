
import { ClientInfo } from "services/MessageManager"
import { LocationType } from "utils/types"
import { map } from './index'
import { EventEmitter } from 'events'

export abstract class Character {

    private location: LocationType
    private direction: number

    constructor(protected clientInfo: ClientInfo, protected image: HTMLImageElement) {
        this.location = { x: clientInfo.index, y: clientInfo.index }
        this.spawn()
    }

    protected get getClientInfo() {
        return this.clientInfo
    }

    protected get getID() {
        return this.clientInfo.ID
    }

    protected get getLocation() {
        return this.location
    }

    private spawn() {
        map.setTileOccupied(this.location, this.getID) // this should be a general search
        this.draw(0)
    }

    private drawImageRot(img: HTMLImageElement, x: number, y: number, width: number, height: number, deg: number){
        //Store the current context state (i.e. rotation, translation etc..)
        map.getContext.save()
    
        //Convert degrees to radian 
        var rad = deg * Math.PI / 180;
    
        //Set the origin to the center of the image
        map.getContext.translate(x + width / 2, y + height / 2);
    
        //Rotate the canvas around the origin
        map.getContext.rotate(rad);
    
        //draw the image    
        map.getContext.drawImage(img,width / 2 * (-1),height / 2 * (-1),width,height);
    
        // Restore canvas state as saved from above
        map.getContext.restore();
    }

    private draw(direction: number) {
        this.drawImageRot(this.image, this.location.x * map.tileSize, this.location.y * map.tileSize, 50, 50, direction)
    }

    private move() {

    }

}