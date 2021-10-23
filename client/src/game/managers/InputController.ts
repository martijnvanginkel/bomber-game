import EventEmitter from 'events'

export enum ArrowKey {
    UP = 'UP',
    DOWN = 'DOWN',
    LEFT = 'LEFT',
    RIGHT = 'RIGHT',
}

export enum AbilityKey {
    Q = 'Q',
    W = 'W',
}

export class InputController extends EventEmitter {
    private keyDown: boolean = false

    constructor() {
        super()
        this.addInputListener()
    }

    private listenToInput = (e: any) => {
//        if (this.keyDown) {
 //           return
  //      }
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
                this.abilityClick(AbilityKey.Q)
                break
            case 'KeyW':
                this.abilityClick(AbilityKey.W)
                break
        }
    }

    private arrowClick(key: ArrowKey) {
        this.emit('arrow-click', key)
    }

    private abilityClick(key: AbilityKey) {
        this.emit('ability-click', key)
    }

    private keyUpEvent() {
        this.keyDown = false
    }

    private addInputListener() {
        document.addEventListener('keydown', this.listenToInput)
        document.addEventListener('keyup', () => this.keyUpEvent())
    }

    public deleteListeners() {
        document.removeEventListener('keydown', this.listenToInput)
        document.removeEventListener('keyup', () => this.keyUpEvent())
    }
}
