import { Images } from './game/images/Images'
import { Map } from './game/map/Map'
import { MessageDistributor } from './game/managers/MessageDistributor'
import { defineComponents } from './views/components/defineComponents'
import { createRouteManager } from './views/RouteManager'
import { io } from 'socket.io-client'

defineComponents()
export const images = new Images()
export const map = new Map()
export const messageDistributor = new MessageDistributor()

const routeManager = createRouteManager()
routeManager.goToRoute('home')

addEventListener('searchingForGame', () => {
    // routeManager.goToRoute('waiting')
    const socket = io().connect()

    socket.on('connected', (gameID: string) => {
        console.log(gameID)
        routeManager.goToRoute('waiting')
    })

    socket.on('start', () => {
        routeManager.goToRoute('game')
    })
})
