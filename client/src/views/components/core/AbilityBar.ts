export class AbilityBar extends HTMLElement {
    private shadow

    constructor() {
        super()
        this.shadow = this.attachShadow({ mode: 'open' })
        // addEventListener('ability-trigger', this.abilityTriggered)
    }

    connectedCallback() {
        this.render()
    }

    render() {
        this.shadow.innerHTML = `
            <style>
                #container {

                }
            </style>

            <div id="container">
                <ability-icon key="Q"></ability-icon>
            </div>
        `
    }
}
