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
        this.listenToArrowInput()
        this.listenToAbilityInput()
    }

    deleteMe = (e: any) => {
        let keyDown = false

        if (keyDown) {
            return
        }
        keyDown = true
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
    }

    public deleteListener() {
        document.removeEventListener('keydown', this.deleteMe)
    }

    private listenToArrowInput() {
        document.addEventListener('keydown', this.deleteMe)

        document.addEventListener('keyup', function () {
            // keyDown = false
        })
    }

    private listenToAbilityInput() {
        let keyDown = false

        document.addEventListener('keydown', (e) => {
            if (keyDown) {
                return
            }
            console.log(e.code)
            keyDown = true
            switch (e.code) {
                case 'KeyA': // A
                    this.abilityClick(e.code)
                    break
            }
        })

        document.addEventListener('keyup', function () {
            keyDown = false
        })
    }

    private arrowClick(key: ArrowKey) {
        this.emit('arrow-click', key)
    }

    private abilityClick(key: any) {
        // define type here
        console.log('key ', key)
        this.emit('ability-click')
    }
}
