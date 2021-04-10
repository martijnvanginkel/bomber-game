import { defineComponents } from './views/components/defineComponents'
import { createRouteManager } from './views/RouteManager'
import { io } from 'socket.io-client'
import { createNewGame, GameInitInfo } from './game/Game'

defineComponents()

const routeManager = createRouteManager()
routeManager.goToRoute('home')

addEventListener('searchingForGame', () => {
    const socket = io().connect()

    socket.on('connected', () => {
        routeManager.goToRoute('waiting')
    })

    socket.on('startGame', (gameInfo: GameInitInfo) => {
        routeManager.goToRoute('game')

        createNewGame(socket, gameInfo)

        socket.on('lost', () => {
            routeManager.goToRoute('home')
        })
    })
})
