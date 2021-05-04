export class GameEndedScreen extends HTMLElement {
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
            <div>
                <h1>Game ended</h1>
            </div>
        `
    }
}
