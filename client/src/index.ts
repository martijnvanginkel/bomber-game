import { defineComponents } from './views/components/defineComponents'
import { createRouteManager } from './views/RouteManager'
import { io } from 'socket.io-client'
import { createNewGame, GameInitInfo } from './game/Game'

defineComponents()

const routeManager = createRouteManager()
routeManager.goToRoute('home')

addEventListener('searchingForGame', () => {
    const socket = io().connect()

    // let ID: number = 0

    // socket.on('client', (ID: number) => {
    //     console.log('asdfasdf')
    //     routeManager.goToRoute('waiting')
    // })

    socket.on('connected', (ID: number) => {
        console.log('connected')
        console.log(ID)
        socket.emit('client', ID)
    })

    socket.on('startGame', (gameInfo: GameInitInfo) => {
        console.log(gameInfo)
        routeManager.goToRoute('game')

        createNewGame(socket, gameInfo)

        socket.on('lost', () => {
            routeManager.goToRoute('home')
        })
    })
})
