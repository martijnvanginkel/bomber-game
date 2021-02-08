import { Images } from './images/Images'
import { Map } from './map/Map'
import { MessageDistributor } from './managers/MessageDistributor'
import io from 'socket.io-client'

// console.log('hoi')
export const images = new Images()
export const map = new Map()
export const messageDistributor = new MessageDistributor()
