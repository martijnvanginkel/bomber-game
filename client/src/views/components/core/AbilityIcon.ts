import { AbilityKey } from "game/managers/InputController"

enum AbilityState {
    default,
    activated,
    cooldown
}

export class AbilityIcon extends HTMLElement {
    private shadow

    private key

    private abilityState: AbilityState = AbilityState.default

    private cooldownTime: number = 10
    

    constructor() {
        super()
        this.shadow = this.attachShadow({ mode: 'open' })
        this.key = this.getAttribute('key')
        // addEventListener('ability-trigger', this.abilityTriggered)
    }

    connectedCallback() {
        this.render()
    }

    startCooldown = () => {
        this.render()
        // console.log('im here')
        this.cooldownTime -= 1
        const timer = setInterval(() => {
            if (this.cooldownTime === 1) {
                const event = new CustomEvent('cooldown-ended', { bubbles: true, composed: true })
                this.dispatchEvent(event)
                clearInterval(timer)
                return
            }
            this.render()
            this.cooldownTime -= 1
        }, 1000)
    }

    abilityTriggered = (event: any) => {
        // console.log('ability triggered')
        this.abilityState = AbilityState.cooldown
        this.startCooldown()
    }

    render() {
        // console.log(this.cooldownTime)
        this.shadow.innerHTML = `
            <style>
                .container {
                    border: 1px solid black;
                    width: 50px;
                }
                .background {
                    background-color: red;
                }
            </style>

            <div class="container ${this.abilityState === AbilityState.cooldown ? 'background' : ''}">
                ${this.abilityState === AbilityState.cooldown ? `<span>${this.cooldownTime}</span>` : `<span>Q</span>`}
            </div>
            `
    }


}
