import { AbilityKey } from '../../../game/managers/InputController'

export class AbilityBar extends HTMLElement {
    private shadow

    private abilities: { [key: string]: { activated: boolean } } = {
        [AbilityKey.Q]: { activated: false },
    }

    constructor() {
        super()
        this.shadow = this.attachShadow({ mode: 'open' })
        addEventListener('activate-ability', this.activateAbility)
    }

    connectedCallback() {
        this.render()
    }

    render() {
        console.log('render ', this.abilities[AbilityKey.Q])
        this.shadow.innerHTML = `
            <style>
                #container {

                }
            </style>

            <div id="container">
                <p style="color:white">asdf</p>
                <ability-icon key="${AbilityKey.Q}" activated="${this.abilities[AbilityKey.Q].activated}">
                </ability-icon>
            </div>
        `
    }

    activateAbility = (event: any) => {
        const { abilityKey, activated } = event.detail
        this.abilities[abilityKey].activated = activated

        this.render()
    }
}