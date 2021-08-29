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
                    display: flex;
                    flex-direction: column;
          
                }
                #top-bar {
                    display: flex;
                    flex-direction: row;
                    width: 100%;
                    justify-content: space-between;
                }
                #ability-bar {
                   
                }
            </style>

            <div id="container">
                <div id="top-bar">
                    <div><health-bar ID="${this.clients[0]}" /></div>
                    <div><health-bar ID="${this.clients[1]}" /></div>
                </div>
                <div id="canvas-container" style="position: relative;">
                
                </div>
                <p style="color:yellow">asdf1</p>
                <ability-bar id="ability-bar"></ability-bar>
            </div>
        `
    }
}
