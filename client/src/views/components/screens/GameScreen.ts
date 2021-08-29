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
                    align-items: center;
                }
                #top-bar {
                    display: flex;
                    flex-direction: row;
                    width: 100%;
                    height: 100%;
                    justify-content: center;
                    margin: 10px 0;
                }
                #stripe {
                    color: white;
                    margin: 0 10px;
                }

                #ability-bar {
                   
                }
            </style>

            <div id="container">
                <div id="top-bar">
                    <div><health-bar ID="${this.clients[0]}" /></div>
                    <div id="stripe">-</div>
                    <div><health-bar ID="${this.clients[1]}" /></div>
                </div>
                <div id="canvas-container" style="position: relative;">
                
                </div>
                <ability-bar id="ability-bar"></ability-bar>
            </div>
        `
    }
}
