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
    const socket = io().connect()

    socket.on('connected', () => {
        routeManager.goToRoute('waiting')
    })

    socket.on('startGame', () => {
        console.log('start game')
        routeManager.goToRoute('game')
    })
})
