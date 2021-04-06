// import { MessageDistributor } from './managers/MessageDistributor'
import { Map } from './map/Map'
import { Images } from './images/Images'
import { Player } from './players/Player'

class Game {
    public constructor(public images: Images, public map: Map) {
        new Player(images, map)
    }
}

export const createNewGame = () => {
    return new Game(new Images(), new Map())
}
