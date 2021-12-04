import { AbilityKey } from '../../../game/managers/InputController'

export class AbilityBar extends HTMLElement {
    private shadow

    constructor() {
        super()
        this.shadow = this.attachShadow({ mode: 'open' })
    }

    connectedCallback() {
        this.render()
    }

    render() {
        this.shadow.innerHTML = `
            <style>
                #container {
                    display: flex;
                    flex-direction: row;
                    margin-top: 20px;
                }
            </style>

            <div id="container">
                <ability-icon key="${AbilityKey.Q}">
                </ability-icon>
                <ability-icon key="W">
                </ability-icon>
                <ability-icon key="E">
                </ability-icon>
            </div>
        `
    }
}
