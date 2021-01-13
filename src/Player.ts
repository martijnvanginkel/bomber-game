// import { Character } from "./Character";
import { ClientInfo } from "./services/MessageManager";
import { images } from './index'
import { Character } from "./Character";

export class Player extends Character {
    constructor(protected clientInfo: ClientInfo) {
        super(clientInfo)
        this.setImage(images.getImage('Player'))
    }


}