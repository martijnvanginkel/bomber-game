import { AbilityKey } from 'game/managers/InputController'

export class AbilityIcon extends HTMLElement {
    private shadow
    private abilityKey: AbilityKey

    private activated: boolean = false
    private inCooldown: boolean = false
    private cooldownTime: number = 0

    constructor() {
        super()
        this.shadow = this.attachShadow({ mode: 'open' })

        addEventListener('activate-ability', this.activateAbility)
        addEventListener('trigger-ability', this.triggerAbility)
        addEventListener('respawn', this.reset)
        this.abilityKey = this.getAttribute('key') as AbilityKey
    }

    connectedCallback() {
        this.render()
    }

    activateAbility = (event: any) => {
        const { abilityKey, activated } = event.detail
        if (abilityKey !== this.abilityKey) {
            return
        }

        this.activated = activated
        this.render()
    }

    triggerAbility = (event: any) => {
        const { abilityKey, cooldownTime } = event.detail
        if (abilityKey !== this.abilityKey) {
            return
        }
        this.cooldownTime = Number(cooldownTime)
        this.inCooldown = true
        this.render()
        const interval = setInterval(() => {
            this.cooldownTime -= 1
            this.render()
            if (this.cooldownTime === 0) {
                this.inCooldown = false
                this.render()
                clearInterval(interval)
            }
        }, 1000)
    }

    reset = () => {
        this.inCooldown = false
        this.activated = false
        this.render()
    }

    renderCooldown() {
        return `
            <span>${this.cooldownTime}</span>
        `
    }

    renderIcon() {
        return `
            <span id="icon">${this.abilityKey}</span>
        `
    }

    render() {
        this.shadow.innerHTML = `
            <style>
                .container {
                    border: 1px solid white;
                    width: 50px;
                    height: 50px;
                    border-width: 2px;
                    border-radius: 5px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin: 0 5px;
                }
                .background {
                    background-color: yellow;
                }
                #icon {
                    color: white;
                }
            </style>

            <div class="container ${this.activated === true ? 'background' : null}">
                ${this.inCooldown ? this.renderCooldown() : this.renderIcon()}
            </div>
            `
    }
}
