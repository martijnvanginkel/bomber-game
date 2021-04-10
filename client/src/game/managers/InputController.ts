import EventEmitter from 'events'

enum ArrowKey {
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
        document.addEventListener('keydown', (e: KeyboardEvent) => {
            switch (e.code) {
                case 'ArrowLeft':
                    this.click(ArrowKey.LEFT)
                    break
                case 'ArrowUp':
                    this.click(ArrowKey.UP)
                    break
                case 'ArrowRight':
                    this.click(ArrowKey.RIGHT)
                    break
                case 'ArrowDown':
                    this.click(ArrowKey.DOWN)
                    break
            }
        })
    }

    private click(key: ArrowKey) {
        this.emit('key-click', key)
    }
}
