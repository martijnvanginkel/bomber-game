export class GameScreen extends HTMLElement {
    private shadow

    private clients: number[]

    constructor() {
        super()
        this.shadow = this.attachShadow({ mode: 'open' })
    }

    connectedCallback() {
        const attribute = this.getAttribute('screen-attribute')
        if (!attribute) {
            return
        }
        const parsed = JSON.parse(attribute)
        this.clients = parsed.clients
        this.render()
    }

    render() {
        this.shadow.innerHTML = `
            <style>
                #container {
                    position: relative;
                }
                #top-bar {
                    display: flex;
                    flex-direction: row;
                    width: 100%;
                    justify-content: space-between;
                }
            </style>

            <div id="container">
                <div id="top-bar">
                    <div><health-bar ID="${this.clients[0]}" /></div>
                    <div><health-bar ID="${this.clients[1]}" /></div>
                </div>
                <div id="canvas-container" style="position: relative;">
                
                </div>
            </div>
        `
    }
}
