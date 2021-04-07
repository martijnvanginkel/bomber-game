// import { Images } from './game/images/Images'
// import { Map } from './game/map/Map'
// import { MessageDistributor } from './game/managers/MessageDistributor'
import { defineComponents } from './views/components/defineComponents'
import { createRouteManager } from './views/RouteManager'
import { io } from 'socket.io-client'
import { createNewGame, GameInitInfo } from './game/Game'
// import { createNewGame, GameInfo } from './game/Game'

defineComponents()
// export const images = new Images()
// export const map = new Map()
// export const messageDistributor = new MessageDistributor()

const routeManager = createRouteManager()
routeManager.goToRoute('home')

addEventListener('searchingForGame', () => {
    const socket = io().connect()

    socket.on('connected', () => {
        routeManager.goToRoute('waiting')
    })

    socket.on('startGame', (gameInfo: GameInitInfo) => {
        routeManager.goToRoute('game')
        // console.log(gameInit)
        createNewGame(gameInfo)

        socket.on('lost', () => {
            routeManager.goToRoute('home')
        })
    })
})
