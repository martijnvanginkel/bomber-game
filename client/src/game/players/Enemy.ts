// import { ClientInfo } from '../managers/MessageDistributor'
// import { images } from './../../index'
import { Map } from 'game/map/Map'
import { Character } from './Character'

export class Enemy extends Character {
    constructor(protected ID: number, protected index: number, protected map: Map) {
        super(ID, index, 'red', map)
    }
}
