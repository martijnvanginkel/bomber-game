import EventEmitter from 'events'

export enum ArrowKey {
    UP = 'UP',
    DOWN = 'DOWN',
    LEFT = 'LEFT',
    RIGHT = 'RIGHT',
}

export class InputController extends EventEmitter {
    constructor() {
        super()
        this.listenToInput()
    }

    private listenToInput() {
        document.addEventListener('keydown', (e) => {
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
            }
        })
    }

    private arrowClick(key: ArrowKey) {
        this.emit('arrow-click', key)
    }
}
