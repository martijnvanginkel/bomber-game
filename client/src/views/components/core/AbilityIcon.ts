import { AbilityKey } from 'game/managers/InputController'

// enum AbilityState {
//     default,
//     activated,
//     cooldown,
// }

export class AbilityIcon extends HTMLElement {
    private shadow
    // private key

    // private abilityState: AbilityState = AbilityState.default
    private activated: boolean = false
    private cooldownTime: number = 10

    constructor() {
        super()
        this.shadow = this.attachShadow({ mode: 'open' })
        // this.key = this.getAttribute('key')
    }

    connectedCallback() {
        this.render()
    }

    static get observedAttributes() {
        return ['activated']
    }

    attributeChangedCallback(propName: string) {
        if (propName === 'activated') {
            this.handleActivatedChange()
        }
        // console.log(propName, value)
        // console.log(this.getAttribute('activated'))
        // if (prop === 'activated') {
        //     this.render()
        // }
    }

    handleActivatedChange() {
        const value = this.getAttribute('activated')
        if (!value) {
            return
        }
        const activated = JSON.parse(value)
        // console.log('activated ', activated)
        this.activated = activated
        this.render()
    }

    startCooldown = () => {
        this.render()
        // console.log('im here')
        // this.cooldownTime -= 1
        // const timer = setInterval(() => {
        //     if (this.cooldownTime === 1) {
        //         const event = new CustomEvent('cooldown-ended', { bubbles: true, composed: true })
        //         this.dispatchEvent(event)
        //         clearInterval(timer)
        //         return
        //     }
        //     this.render()
        //     this.cooldownTime -= 1
        // }, 1000)
    }

    // abilityTriggered = (event: any) => {
    //     // console.log('ability triggered')
    //     this.abilityState = AbilityState.cooldown
    //     this.startCooldown()
    // }

    render() {
        // console.log(this.cooldownTime)
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
                <span id="icon">${this.getAttribute('key')}</span>
            </div>
            `
    }
}
