import { Images } from './game/images/Images'
import { Map } from './game/map/Map'
import { MessageDistributor } from './game/managers/MessageDistributor'
// import { BasicButton } from './views/components/core/BasicButton'
// import { HomeScreen } from './views/components/screens/HomeScreen'
import { defineComponents } from './views/components/defineComponents'
import { createRouteManager } from './views/RouteManager'
import { io } from 'socket.io-client'

defineComponents()
export const images = new Images()
export const map = new Map()
export const messageDistributor = new MessageDistributor()

const routeManager = createRouteManager()
routeManager.goToRoute('home')

const socket = io().connect()

socket.on('connected', (gameID: string) => {
    console.log('room connect')

    console.log(gameID)
})

addEventListener('searchingForGame', () => {
    routeManager.goToRoute('game')
})

// setTimeout(() => {
//     const event = new CustomEvent('gameState', {
//         bubbles: true, // bubble event to containing elements
//         composed: true, // let the event pass through the shadowDOM boundary
//         detail: {
//             route: 'asdf',
//         },
//     })
//     dispatchEvent(event)
// }, 2000)
