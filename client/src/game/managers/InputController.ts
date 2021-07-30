import EventEmitter from 'events'

export enum ArrowKey {
    UP = 'UP',
    DOWN = 'DOWN',
    LEFT = 'LEFT',
    RIGHT = 'RIGHT',
}

export enum AbilityKey {
    Q = 'Q',
}

interface AbilityStatus {
    activated: boolean
    inCooldown: boolean
    cooldownTime: number
}

interface AbilitiesState {
    [AbilityKey.Q]: AbilityStatus
}

export class InputController extends EventEmitter {
    private keyDown: boolean = false
    private activatedAbility: AbilityKey | null = null

    private abilities: AbilitiesState = {
        [AbilityKey.Q]: { 
            activated: false,
            inCooldown: false,
            cooldownTime: 10
         }
    }

    constructor() {
        super()
        this.addInputListener()
    }

    private arrowClick(key: ArrowKey) {
        if (this.activatedAbility === AbilityKey.Q) {
            this.triggerAbility(key)
            return
        }

        this.emit('arrow-click', key)
    }

    private listenToInput = (e: any) => {
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

    private activateAbility = (key: AbilityKey) => {

        const ability = this.abilities[key]

        if (ability.inCooldown) {
            return
        }

        console.log('CANT GET EHRE')
        // console.log('value ', this.activatedAbility)
        // console.log(ability)

        if (this.activatedAbility === null) {
            this.activatedAbility = key
            this.abilities[key] = {
                activated: false,
                inCooldown: true,
                cooldownTime: this.abilities[key].cooldownTime -= 1
            }
            const interval = setInterval(() => {
                if (this.abilities[key].cooldownTime === 0) {
                    clearInterval(interval)
                    return
                } 
                this.abilities[key] = {
                    activated: false,
                    inCooldown: true,
                    cooldownTime: this.abilities[key].cooldownTime -= 1
                }
                // console.log(this.abilities[key])
                // console.log('loop')
            }, 1000)
            return
        }

        if (ability.activated) {
            this.deActivateAbility(key)
            return
        }

        if (key !== this.activatedAbility && this.activatedAbility !== null) {
            throw new Error('Not yet implemented. Only have 1 ability atm.')
        }

        if (this.abilities[key].inCooldown) {
            return
        }

        this.activatedAbility = key

        // this.abilities[key] = {
        //     inCooldown: true,
        //     cooldownTime: 10
        // }


    }

    private deActivateAbility(key: AbilityKey) {

    }

    private triggerAbility(arrowKey: ArrowKey) {
        const event = new CustomEvent('ability-trigger', {
            detail: {
                abilityKey: this.activatedAbility,
                arrowKey: arrowKey,
            },
            bubbles: true,
            composed: true,
        })
        dispatchEvent(event)
        this.emit('ability-trigger', event)
        this.activatedAbility = null
    }
}
