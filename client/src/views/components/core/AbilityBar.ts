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
                    display: flex;
                    flex-direction: row;
                    margin-top: 20px;
                }
            </style>

            <div id="container">
                <ability-icon key="${AbilityKey.Q}" activated="${this.abilities[AbilityKey.Q].activated}">
                </ability-icon>
                <ability-icon key="W" activated="${false}">
                </ability-icon>
                <ability-icon key="E" activated="${false}">
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
