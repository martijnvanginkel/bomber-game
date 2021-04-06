import { MessageDistributor } from './managers/MessageDistributor'
import { Map } from './map/Map'
import { Images } from './images/Images'

class Game {
    public constructor(public images: Images, public map: Map, public messageDistributor: MessageDistributor) {}
}

export const createNewGame = () => {
    return new Game(new Images(), new Map(), new MessageDistributor())
}
