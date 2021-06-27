import EventEmitter from 'events'

export enum ArrowKey {
    UP = 'UP',
    DOWN = 'DOWN',
    LEFT = 'LEFT',
    RIGHT = 'RIGHT',
}

export class InputController extends EventEmitter {
    private keyDown: boolean = false

    constructor() {
        super()
        this.addInputListener()
    }

    private arrowClick(key: ArrowKey) {
        this.emit('arrow-click', key)
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
            case 'KeyA':
                this.abilityClick(e.code)
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

    private abilityClick(key: any) {
        // define type here
        this.emit('ability-click')
    }
}
