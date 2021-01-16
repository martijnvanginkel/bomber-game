import { Game } from './Game'
import { Images } from './images/Images'
import { Map } from './map/Map'
import { MessageManager } from './services/MessageManager'


export const images = new Images()
export const map = new Map()
export const messageManager = new MessageManager()

// console.log(images.getImage('player'))
// export const game = new Game()


// game.intializeGame()

// export const connection = new ConnectionManager(game)



// create connection manager
// zet connection manager op de game

// vanuit de speler zou ik dit willen doen: CommunicateInput(a)

// vanuit de CommunicationManager zou ik dan iets willen koppelen aan de keycode



// ik heb een connectionmanager die een