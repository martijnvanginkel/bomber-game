import { defineComponents } from './views/components/defineComponents'
import { createRouteManager } from './views/RouteManager'
import { io } from 'socket.io-client'
import { createNewGame, GameInitInfo } from './game/Game'

defineComponents()

const routeManager = createRouteManager()
routeManager.goToRoute('home')

addEventListener('searchingForGame', () => {
    const socket = io().connect()

    socket.on('connected', (ID: number) => {
        routeManager.goToRoute('waiting')
        socket.emit('clientConnected', ID)

        socket.on('startGame', (gameInfo: GameInitInfo) => {
            routeManager.goToRoute('game')

            console.log(ID, gameInfo)

            createNewGame(socket, gameInfo)

            socket.on('lost', () => {
                routeManager.goToRoute('home')
            })
        })
    })
})
