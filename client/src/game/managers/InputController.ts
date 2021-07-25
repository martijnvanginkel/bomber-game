import EventEmitter from 'events'
import { AbilityKey } from '../utils/types'

export enum ArrowKey {
    UP = 'UP',
    DOWN = 'DOWN',
    LEFT = 'LEFT',
    RIGHT = 'RIGHT',
}

export class InputController extends EventEmitter {
    private keyDown: boolean = false
    private activatedAbility: AbilityKey | null = null

    constructor() {
        super()
        this.addInputListener()
    }

    private arrowClick(key: ArrowKey) {
        if (this.activatedAbility === AbilityKey.Q) {
            this.emit('ability-trigger', key, this.activatedAbility)
            this.activatedAbility = null
            return
        }

        this.emit('arrow-click', key)
    }

    private activateAbility(key: AbilityKey) {
        this.activatedAbility = key
    }

    listenToInput = (e: any) => {
        if (this.keyDown) {
            return
        }
        this.keyDown = true
        switch (e.code) {
            case 'ArrowLeft':
                this.arrowClick(ArrowKey.LEFT)
                break
            case 'ArrowUp':
                this.arrowClick(ArrowKey.UP)
                break
            case 'ArrowRight':
                this.arrowClick(ArrowKey.RIGHT)
                break
            case 'ArrowDown':
                this.arrowClick(ArrowKey.DOWN)
                break
            case 'KeyQ':
                this.activateAbility(AbilityKey.Q)
                break
        }
    }

    private addInputListener() {
        document.addEventListener('keydown', this.listenToInput)
        document.addEventListener('keyup', () => (this.keyDown = false))
    }

    public deleteListeners() {
        document.removeEventListener('keydown', this.listenToInput)
    }
}
