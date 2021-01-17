
import { ClientInfo } from './services/MessageManager'
import { LocationType, Direction } from './utils/types'
import { map } from './index'

export abstract class Character {

    private location: LocationType

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
        const tile = map.getTileByLocation(this.location)
        tile?.setOccupied(this.getID)
        this.draw(Direction.NORTH)
    }

    private drawImageRot(img: HTMLImageElement, x: number, y: number, width: number, height: number, deg: number){
        const rad = deg * Math.PI / 180;
        map.getContext.save()
        map.getContext.translate(x + width / 2, y + height / 2);
        map.getContext.rotate(rad);
        map.getContext.drawImage(img,width / 2 * (-1),height / 2 * (-1),width,height);
        map.getContext.restore();
    }

    private draw(direction: Direction) {
        this.drawImageRot(this.image, this.location.x * map.tileSize, this.location.y * map.tileSize, 50, 50, direction)
    }

    protected move(oldLocation: LocationType, newLocation: LocationType, ID: string, direction: Direction) {
        const oldTile = map.getTileByLocation(oldLocation)
        const newTile = map.getTileByLocation(newLocation)
        oldTile?.setUnoccupied()
        newTile?.setOccupied(ID)
        this.location = newLocation
        this.draw(direction)
    }

}