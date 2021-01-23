import { ClientInfo } from '../managers/MessageManager'
import { images } from '../index'
import { Character } from './Character'

export class Enemy extends Character {
    constructor(protected clientInfo: ClientInfo) {
        super(clientInfo, images.getImage('player'))
    }
}
