import { defineComponents } from './views/components/defineComponents'
import { createRouteManager } from './views/RouteManager'
import { io } from 'socket.io-client'
import { createNewGame, GameInitInfo } from './game/Game'

defineComponents()

const routeManager = createRouteManager()
routeManager.goToRoute('home')

addEventListener('searchingForGame', () => {
    const socket = io().connect()

    socket.on('connected', (clientID: number) => {
        routeManager.goToRoute('waiting')
        socket.emit('clientConnected', clientID)

        socket.on('startGame', (gameID: string, clients: number[]) => {
            routeManager.goToRoute('game')

            createNewGame(socket, {
                gameID,
                clients,
                clientID,
            })
        })

        socket.on('lost', () => {
            routeManager.goToRoute('home')
        })
    })
})
